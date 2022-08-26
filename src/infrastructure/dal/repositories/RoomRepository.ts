import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { RoomDocument } from '../models/Room.document';
import { GenericRepository } from './generic/GenericRepository';
import { RoomCreateRequestDto } from 'src/domain/dto/request/room/RoomCreateRequestDto';
import { ParticipantDocument } from '../models/Participant.document';
import { UserDocument } from '../models/User.document.';
import { ErrorConstants } from 'src/domain/common/constants/ErrorConstants';
import { IParticipantEntity } from 'src/domain/common/interfaces/entities/IParticipantEntity';

@Injectable()
export class RoomRepository extends GenericRepository<RoomDocument> {  

  private readonly logger = new Logger(RoomRepository.name)
  
  constructor(    
    @InjectModel(RoomDocument.name)
    private roomRepository: Model<RoomDocument>,
    @InjectModel(ParticipantDocument.name)
    private participantRepository: Model<ParticipantDocument>,
    @InjectModel(UserDocument.name)
    private userRepository: Model<UserDocument>,
  ) {
    super(roomRepository, new Logger(RoomRepository.name));
  }

  /**
   * Busca salas por usuario
   * @summary Busca salas por usuario
   * @param username 
   * @param populate 
   * @returns lista de datos de salas
   */
  async findByUsername(username:string, populate?: object | string): Promise<RoomDocument[]>{
    let filter = {
      username: username,
      lastMessage: { $ne: null }
    };
    let data = [];
    if(populate){
      data =  await this.roomRepository.find(filter).populate(populate) ;
    }else{
      data =  await this.roomRepository.find(filter);
    }    
    return data;
  }

  /**
   * Crea salas con sus respectivos datos de usuario y participantes
   * @summary Crea salas con sus respectivos datos de usuario y participantes
   * @description Crea salas con sus respectivos datos de usuario y participantes
   * @param createRoomDto 
   * @returns El identificador de la sala creada
   */
  async createFullData(createRoomDto: RoomCreateRequestDto): Promise<string>{
  
    let datosAux = [];

    this.logger.log(`Se valida que roomManager exista id -> ${createRoomDto.roomManager}`);
    // Consulto si roomManager existe
    let userManager = await this.userRepository.findById(createRoomDto.roomManager);
    if(!userManager){
      throw new BadRequestException('No se encontro usuario',ErrorConstants.NOT_FOUND);
    }
    
    this.logger.log(`Se realiza inserciones de usuarios`);
    // Lista de participantes: Busco, actualizo e inserto en caso de no haber sobre usuarios
    await Promise.all(createRoomDto.participants.map(async (p) => {
      let user = await this.userRepository.findOneAndUpdate({
        username: p.username
      },
      { $set: {
        name: p.name,
        lastname: p.lastname
      }},
      { upsert: true })

      datosAux.push({
        username: user.username,
        id: user.id
      })
    }));
    
    this.logger.log(`Se realiza insercion de sala`);
    // ROOM: Inserto sala
    createRoomDto.status = createRoomDto.cancelDate>=new Date(Date.now());
    const room = await this.roomRepository.create(createRoomDto);

    this.logger.log(`Se realiza insercion de participantes`);
    // PARTICIPANTS: Se crea datos de participantes
    await Promise.all(createRoomDto.participants.map(async (p) => {
      let participant: IParticipantEntity = {
        username: p.username,
        idRoom: room.id,
        idUser: datosAux.find(x=>x.username===p.username).id,
        messagesUnRead: 0,
        deleted: false
      }
      await this.participantRepository.create(participant);
    }));
    
    return room.id;
  }
}
//NATIVE
import { BadRequestException, Injectable, Logger} from '@nestjs/common';
//CUSTOM
import { ParticipantRepository, RoomRepository, UserRepository } from 'src/infrastructure/dal/repositories';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';
import { ErrorConstants } from 'src/domain/common/constants/ErrorConstants';
import { ParticipantCreateRequestDto } from 'src/domain/dto/request/participant/ParticipantCreateRequestDto';
import { RoomUpdateRequestDto } from 'src/domain/dto/request/room/RoomUpdateRequestDto';
import { ParticipantResponseDto } from 'src/domain/dto/response/participant/ParticipantResponseDto';
import { ParticipantUpdateRequestDto } from 'src/domain/dto/request/participant/ParticipantUpdateRequestDto';
import { RoomDocument } from 'src/infrastructure/dal/models/Room.document';

@Injectable()
export class ParticipantUseCase {
  
  private readonly logger = new Logger(ParticipantUseCase.name);

  constructor(
    private participantRepository : ParticipantRepository,
    private userRepository : UserRepository,
    private roomRepository : RoomRepository,
    private mapper: MapperDto
    ) {}

  async getAll(): Promise<ParticipantResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de particpantes');
    let data = await this.participantRepository.findAllWithPopulate('idRoom idUser');        
    return  data.map(x => (this.mapper.participantDocumentToEntity(x,true))) as ParticipantResponseDto[];
  }

  async getById(id: string): Promise<ParticipantResponseDto> {
    this.logger.log(`Se busca particpante con id -> ${id}`);
    let data = await (await this.participantRepository.findByIdWithPopulate(id,"idRoom idUser"));
    return this.mapper.participantDocumentToEntity(data,true) as ParticipantResponseDto;    
  }

  async create(createParticipantDto: ParticipantCreateRequestDto): Promise<string> {    
    const room = await this.participantRepository.create(createParticipantDto);
    return room;
  }

  async update(id: string, updateParticipantDto: ParticipantUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza particpante con id -> ${id}`);
    let userManager = await this.userRepository.findById(updateParticipantDto.idUser);
    if(!userManager){
      throw new BadRequestException('No se encontro usuario',ErrorConstants.NOT_FOUND);
    }

    let roomManager = await this.roomRepository.findById(updateParticipantDto.idRoom);
    if(!roomManager){
      throw new BadRequestException('No se encontro room',ErrorConstants.NOT_FOUND);
    }

    updateParticipantDto.lastModifiedOn = new Date(Date.now());
    await this.participantRepository.update({id: id},updateParticipantDto);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Se elimina particpante con id -> ${id}`);
    await this.participantRepository.deleteOne({id:id});
  }

  async getByRoomID(id: string): Promise<ParticipantResponseDto[]>{
    this.logger.log('Se obtiene todos los datos de particpantes');
    let data = await this.participantRepository.findByRoomID(id);
    return  data.map(x => (this.mapper.participantDocumentToEntity(x,true))) as ParticipantResponseDto[];
  }
}
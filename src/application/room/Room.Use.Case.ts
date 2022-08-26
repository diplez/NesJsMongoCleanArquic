//NATIVE
import { BadRequestException, Injectable, Logger} from '@nestjs/common';
import { ErrorConstants } from 'src/domain/common/constants/ErrorConstants';
import { RoomCreateRequestDto } from 'src/domain/dto/request/room/RoomCreateRequestDto';
import { RoomUpdateRequestDto } from 'src/domain/dto/request/room/RoomUpdateRequestDto';
//CUSTOM
import { RoomResponseDto } from 'src/domain/dto/response/room/RoomResponseDto';;
import { ParticipantRepository, RoomRepository, UserRepository } from 'src/infrastructure/dal/repositories';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';

@Injectable()
export class RoomUseCase {
  
  private readonly logger = new Logger(RoomUseCase.name);

  constructor(
    private roomRepository : RoomRepository,
    private userRepository : UserRepository,
    private mapper: MapperDto
    ) {}

  async getAll(): Promise<RoomResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de salas');
    let data = await this.roomRepository.findAllWithPopulate('roomManager lastMessage');    
    return  data.map(x => (this.mapper.roomDocumentToEntity(x,true))) as RoomResponseDto[];
  }

  async getById(id: string): Promise<RoomResponseDto> {
    this.logger.log(`Se busca sala con id -> ${id}`);
    let data = await (await this.roomRepository.findByIdWithPopulate(id,"roomManager lastMessage"));
    return this.mapper.roomDocumentToEntity(data,true) as RoomResponseDto;    
  }

  async create(createRoomDto: RoomCreateRequestDto): Promise<string> {    
    const room = await this.roomRepository.createFullData(createRoomDto);
    return room;
  }

  async update(id: string, updateRoomDto: RoomUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza sala con id -> ${id}`);
    let userManager = await this.userRepository.findById(updateRoomDto.roomManager);
    if(!userManager){
      throw new BadRequestException('No se encontro usuario',ErrorConstants.NOT_FOUND);
    }
    updateRoomDto.lastModifiedOn = new Date(Date.now());
    await this.roomRepository.update({id: id},updateRoomDto);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Se elimina sala con id -> ${id}`);
    await this.roomRepository.deleteOne({id:id});
  }

  async getByUsername(username: string): Promise<RoomResponseDto[]> {
    this.logger.log(`Se busca sala con username -> ${username}`);
    let data = await this.roomRepository.findByUsername(username,'roomManager lastMessage');
    return  data.map(x => (this.mapper.roomDocumentToEntity(x,true))) as RoomResponseDto[];
  }
}
//NATIVE
import { BadRequestException, Injectable, Logger} from '@nestjs/common';
//CUSTOM
import { MessageRepository, RoomRepository, UserRepository } from 'src/infrastructure/dal/repositories';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';
import { ErrorConstants } from 'src/domain/common/constants/ErrorConstants';
import { ParticipantCreateRequestDto } from 'src/domain/dto/request/participant/ParticipantCreateRequestDto';
import { RoomUpdateRequestDto } from 'src/domain/dto/request/room/RoomUpdateRequestDto';
import { ParticipantUpdateRequestDto } from 'src/domain/dto/request/participant/ParticipantUpdateRequestDto';
import { RoomDocument } from 'src/infrastructure/dal/models/Room.document';
import { MessageResponseDto } from 'src/domain/dto/response/message/MessageResponseDto';
import { MessageCreateRequestDto } from 'src/domain/dto/request/message/MessageCreateRequestDto';
import { PaginationQueryDto } from 'src/domain/dto/generic/PaginationQueryDto';
import { MessageUpdateRequestDto } from 'src/domain/dto/request/message/MessageUpdateRequestDto';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { FileResponseDto } from 'src/domain/dto/response/file/FileResponseDto';

@Injectable()
export class MessageUseCase {
  
  private readonly logger = new Logger(MessageUseCase.name);

  constructor(
    private messageRepository : MessageRepository,
    private userRepository : UserRepository,
    private roomRepository : RoomRepository,
    private mapper: MapperDto
    ) {}

  async getAll(paginationQuery?: PaginationQueryDto): Promise<MessageResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de particpantes');
    let data = await this.messageRepository.findAllWithPopulatePagination('room from file',paginationQuery.page,paginationQuery.limit);
    return  data.map(x => (this.mapper.messageDocumentToEntity(x,true))) as MessageResponseDto[];
  }

  async getById(id: string): Promise<MessageResponseDto> {
    this.logger.log(`Se busca particpante con id -> ${id}`);
    let data = await (await this.messageRepository.findByIdWithPopulate(id,"room from file"));
    return this.mapper.messageDocumentToEntity(data,true) as MessageResponseDto;    
  }

  async create(createMessageDto: MessageCreateRequestDto): Promise<string> {    
    const room = await this.messageRepository.create(createMessageDto);
    return room;
  }

  async update(id: string, updateMessageDto: MessageUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza particpante con id -> ${id}`);
    let userManager = await this.userRepository.findById(updateMessageDto.from);
    if(!userManager){
      throw new BadRequestException('No se encontro usuario',ErrorConstants.NOT_FOUND);
    }

    let roomManager = await this.roomRepository.findById(updateMessageDto.room);
    if(!roomManager){
      throw new BadRequestException('No se encontro room',ErrorConstants.NOT_FOUND);
    }

    updateMessageDto.lastModifiedOn = new Date(Date.now());
    await this.messageRepository.update({id: id},updateMessageDto);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Se elimina particpante con id -> ${id}`);
    await this.messageRepository.deleteOne({id:id});
  }

  async getByRoomId(id: string,paginationQuery: PaginationQueryDto): Promise<MessageResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de particpantes');
    let data = await this.messageRepository.findByRoomId(id,paginationQuery);
    return  data.map(x => (this.mapper.messageDocumentToEntity(x,true))) as MessageResponseDto[];
  }
}
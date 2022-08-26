//NATIVE
import { BadRequestException, Injectable, Logger} from '@nestjs/common';
//CUSTOM
import { FileRepository, MessageRepository } from 'src/infrastructure/dal/repositories';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';
import { PaginationQueryDto } from 'src/domain/dto/generic/PaginationQueryDto';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { FileResponseDto } from 'src/domain/dto/response/file/FileResponseDto';
import { FileResponseTotalDto } from 'src/domain/dto/response/file/FileResponseTotalDto';
import { FileCreateRequestDto } from 'src/domain/dto/request/file/FileCreateRequestDto';
import { FileUpdateRequestDto } from 'src/domain/dto/request/file/FileUpdateRequestDto';
import { ErrorConstants } from 'src/domain/common/constants/ErrorConstants';

@Injectable()
export class FileUseCase {
  
  private readonly logger = new Logger(FileUseCase.name);

  constructor(
    private fileRepository : FileRepository,
    private messageRepository : MessageRepository,
    private mapper: MapperDto
    ) {}

  async getAll(paginationQuery?: PaginationQueryDto): Promise<FileResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de archivos');
    let data = await this.fileRepository.findAllPaginate(paginationQuery.page,paginationQuery.limit);
    return  data.map(x => (this.mapper.fileDocumentToEntity(x,true))) as FileResponseDto[];
  }

  async getById(id: string): Promise<FileResponseDto> {
    this.logger.log(`Se busca archivo con id -> ${id}`);
    let data = await (await this.fileRepository.findById(id));
    return this.mapper.fileDocumentToEntity(data,true) as FileResponseDto;    
  }

  async create(createFileDto: FileCreateRequestDto): Promise<string> {    
    const room = await this.fileRepository.create(createFileDto);
    return room;
  }

  async update(id: string, updateFileDto: FileUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza archivo con id -> ${id}`);
    let message = await this.messageRepository.findById(updateFileDto.message);
    if(!message){
      throw new BadRequestException('No se encontro room',ErrorConstants.NOT_FOUND);
    }
    updateFileDto.lastModifiedOn = new Date(Date.now());
    await this.messageRepository.update({id: id},updateFileDto);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Se elimina archivo con id -> ${id}`);
    await this.fileRepository.deleteOne({id:id});
  }

  async getFilesMessageByRoomId(id: string,messageFileQuery: MessageFileQueryDto): Promise<FileResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de archivos');
    let data = await this.fileRepository.findFilesMessageByRoomId(id,messageFileQuery);    
    return  data.map(x => (this.mapper.fileDocumentToEntity(x,true))) as FileResponseDto[];
  }

  async getTotalByRoomId(id:string): Promise<FileResponseTotalDto[]>{
    this.logger.log('Se obtiene todos los datos de archivos');
    let data = await this.fileRepository.findTotalByRoomId(id);    
    return  data;
  }
}
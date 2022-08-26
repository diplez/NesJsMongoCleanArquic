import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TYPE_FILE } from 'src/domain/common/enums/TypesData';
import { PaginationUtils } from 'src/domain/common/utils/PaginationUtils';
import { PaginationQueryDto } from 'src/domain/dto/generic/PaginationQueryDto';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { FileDocument } from '../models/File.document';
import { MessageDocument } from '../models/Message.document';
import { GenericRepository } from './generic/GenericRepository';

@Injectable()
export class MessageRepository extends GenericRepository<MessageDocument> {  

  private readonly logger = new Logger(MessageRepository.name)
  
  constructor(
    @InjectModel(MessageDocument.name)
    private messageRepository: Model<MessageDocument>,
    @InjectModel(FileDocument.name)
    private fileRepository: Model<FileDocument>,
  ) {
    super(messageRepository, new Logger(MessageRepository.name));
  }

  /**
   * Busca mensajes por identificador de sala
   * @summary Busca mensajes por identificador de sala
   * @description Busca mensajes por identificador de sala   
   * @param id 
   * @param paginationQuery 
   * @returns 
   */
  async findByRoomId(id: string,paginationQuery?: PaginationQueryDto): Promise<MessageDocument[]>{    
    let data = await this.messageRepository.find({
      room: id
    }).populate('room from file')
    .skip(PaginationUtils.fromSkipToPage(paginationQuery.page,paginationQuery.limit))
    .limit(paginationQuery.limit);
    return data;
  }
}
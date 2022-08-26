import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TYPE_FILE } from 'src/domain/common/enums/TypesData';
import { PaginationUtils } from 'src/domain/common/utils/PaginationUtils';
import { FilesGroupTotalDto } from 'src/domain/dto/custom/repositories/FilesGroupTotalDto';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { FileResponseDto } from 'src/domain/dto/response/file/FileResponseDto';
import { FileResponseTotalDto } from 'src/domain/dto/response/file/FileResponseTotalDto';
import { FileDocument } from '../models/File.document';
import { MessageDocument } from '../models/Message.document';
import { GenericRepository } from './generic/GenericRepository';

@Injectable()
export class FileRepository extends GenericRepository<FileDocument> {  

  private readonly logger = new Logger(FileRepository.name)
  
  constructor(
    @InjectModel(FileDocument.name)
    private fileRepository: Model<FileDocument>,
    @InjectModel(MessageDocument.name)
    private messageRepository: Model<MessageDocument>,
  ) {
    super(fileRepository, new Logger(FileRepository.name));
  }

  
  /**
   * Busca archivos en los mensajes segun la sala 
   * @summary Busca archivos en los mensajes segun la sala 
   * @description Busca archivos en los mensajes segun la sala 
   * @param id 
   * @param typeFile 
   */
   async findFilesMessageByRoomId(id: string,messageFileQuery: MessageFileQueryDto): Promise<FileDocument[]>{
    let data = [];
    if(messageFileQuery.typeFile===TYPE_FILE.ALLS){
      data = await this.fileRepository
      .find()
      .populate({
        path: 'message',
        match: { room : id }
      }).skip(PaginationUtils.fromSkipToPage(messageFileQuery.page,messageFileQuery.limit))
      .limit(messageFileQuery.limit)
    }else{
      data = await this.fileRepository
      .find({
        typeFile: messageFileQuery.typeFile
      })
      .populate({
        path: 'message',
        match: { room : id }
      }).skip(PaginationUtils.fromSkipToPage(messageFileQuery.page,messageFileQuery.limit))
      .limit(messageFileQuery.limit)
    }
    return data;
  }

  /**
   * Obtiene total de archivos agrupados segun el tipo
   * @summary Obtiene total de archivos agrupados segun el tipo
   * @description Obtiene total de archivos agrupados segun el tipo
   * @param id 
   * @returns 
   */
  async findTotalByRoomId(id: string): Promise<FileResponseTotalDto[]>{

    var mongoose = require('mongoose');
    let match = [
      {
        $match: {
          $and: [
            {
              room: mongoose.Types.ObjectId(id) 
            },
            {
              file: { $exists: true }
            }
          ]
        }
      },     
      {
        $lookup: {
          "from": "files",
          "localField": "file",
          "foreignField": "_id",
          "as": "detailsFile"
        }
      }, 
      {$unwind:'$detailsFile'},
      {
        $group:
          {
            _id: {
                'tfile': '$detailsFile.typeFile',
                'idRoom': '$room'
              },
            total: { $sum:1 },
            sizeFiles: { $sum: '$detailsFile.sizeFile' }
          } 
      }
    ];
    
    let data = (await this.messageRepository.aggregate(match)) as FilesGroupTotalDto[];    
    
    return  data.map(x=>({
      id: id,
      type: x._id.tfile,
      total: x.total,
      sizeFiles: 0
    } as FileResponseTotalDto));
  }
}
import { Injectable } from "@nestjs/common";
import { FileEntity } from "src/domain/common/entities/FileEntity";
import { MessageEntity } from "src/domain/common/entities/MessageEntity";
import { ParticipantEntity } from "src/domain/common/entities/ParticipantEntity";
import { RoomEntity } from "src/domain/common/entities/RoomEntity";
import { UserEntity } from "src/domain/common/entities/UserEntity";
import { FileDocument } from "src/infrastructure/dal/models/File.document";
import { MessageDocument } from "src/infrastructure/dal/models/Message.document";
import { ParticipantDocument } from "src/infrastructure/dal/models/Participant.document";
import { RoomDocument } from "src/infrastructure/dal/models/Room.document";
import { UserDocument } from "src/infrastructure/dal/models/User.document.";

@Injectable()
export class MapperDto {

  /**
   * Mapea datos de user document en UserEntity
   * @param userDocument 
   * @returns 
   */
  public userDocumentToEntity(userDocument: UserDocument) : UserEntity {
    return {
      id: userDocument.id,
      active: userDocument.active,
      avatar: userDocument.avatar,
      createdBy: userDocument.createdBy,
      createdOn: userDocument.createdOn,
      lastModifiedOn: userDocument.lastModifiedOn,
      lastname: userDocument.lastname,
      name: userDocument.name,
      room: userDocument.room,
      username: userDocument.username,      
      socket: userDocument.socket
    } as UserEntity;
  }

  /**
   * Mapea datos de room document en RoomEntity
   * @param roomDocument 
   * @returns 
   */
  public roomDocumentToEntity(roomDocument: RoomDocument, populate?: boolean) : RoomEntity {
    let lastMessage = (roomDocument.lastMessage as MessageDocument);
    return {
      id: roomDocument.id,
      name: roomDocument.name,
      roomManager: roomDocument.roomManager && populate?{
        id: roomDocument.roomManager.id,
        name: roomDocument.roomManager.name,
        lastname: roomDocument.roomManager.lastname,
        username: roomDocument.roomManager.username,
        avatar: roomDocument.roomManager.avatar,
        socket: roomDocument.roomManager.socket
      }:roomDocument.roomManager,
      lastMessage: lastMessage && populate?{  
        id: lastMessage?.id,
        content: lastMessage?.content      
      }:roomDocument.lastMessage,
      status: roomDocument.status,
      type: roomDocument.type,
      cancelDate: roomDocument.cancelDate,
      createdBy: roomDocument.createdBy,
      createdOn: roomDocument.createdOn,
      lastModifiedOn: roomDocument.lastModifiedOn
    } as RoomEntity;
  }

  /**
   * Mapea datos de room document en RoomEntity
   * @param participantDocument 
   * @returns 
   */
  public participantDocumentToEntity(participantDocument: ParticipantDocument, populate?: boolean) : ParticipantEntity {
    let roomDocument = (participantDocument.idRoom as RoomDocument);
    return {
      id: participantDocument.id,
      username: participantDocument.username,
      messagesUnRead: participantDocument.messagesUnRead,
      deleted: participantDocument.deleted,
      createdBy: participantDocument.createdBy,
      createdOn: participantDocument.createdOn,
      lastModifiedOn: participantDocument.lastModifiedOn,
      idRoom: populate?{
        id: roomDocument.id,
        name: roomDocument.name,
        status: roomDocument.status,
        type: roomDocument.type
      }:participantDocument.idRoom,
      idUser: populate?{
        id: participantDocument.idUser.id,
        name: participantDocument.idUser.name,
        lastname: participantDocument.idUser.lastname,
        avatar: participantDocument.idUser.avatar,
        username: participantDocument.idUser.username
      }:participantDocument.idUser
    } as ParticipantEntity;
  }

  /**
   * Mapea datos de room document en RoomEntity
   * @param participantDocument 
   * @returns 
   */
  public messageDocumentToEntity(messageDocument: MessageDocument, populate?: boolean) : MessageEntity {
    let roomDocument = (messageDocument.room as RoomDocument);
    let userDocument = (messageDocument.from as UserDocument);
    let files = messageDocument.file.map(x=>(this.fileDocumentToEntity(x)));
    return {
      id: messageDocument.id,
      content: messageDocument.content,
      fromName: messageDocument.fromName,
      status: messageDocument.status,
      createdBy: messageDocument.createdBy,
      lastModifiedOn: messageDocument.lastModifiedOn,
      room: roomDocument && populate?{
        id: roomDocument.id,
        name: roomDocument.name,
        status: roomDocument.status,
        type: roomDocument.type
      }:messageDocument.room,
      file: files,
      from: userDocument && populate? {
        id: userDocument.id,
        name: userDocument.name,
        lastname: userDocument.lastname,
        avatar: userDocument.avatar
      }:messageDocument.from
    } as MessageEntity;
  }

  /**
   * Mapea datos de room document en RoomEntity
   * @param participantDocument 
   * @returns 
   */
  public fileDocumentToEntity(fileDocument: FileDocument, populate: boolean = false) : FileEntity {    
    return {
      id: fileDocument.id,
      name: fileDocument.name,
      urlFileView: fileDocument.urlFileView,
      urlFileDownload: fileDocument.urlFileDownload,
      typeFile: fileDocument.typeFile,
      sizeFile: fileDocument.sizeFile,
      createdBy: fileDocument.createdBy,
      createdOn: fileDocument.createdOn,
      lastModifiedOn: fileDocument.lastModifiedOn
    } as FileEntity;
  }
}
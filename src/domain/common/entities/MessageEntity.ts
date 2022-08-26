import { ApiProperty } from "@nestjs/swagger";
import { STATUS_MESSAGE } from "../enums/TypesData";
import { IAuditableEntity } from "../interfaces/auditable/IAuditableEntity";
import { IMessageEntity } from "../interfaces/entities/IMessageEntity";
import { FileEntity } from "./FileEntity";
import { RoomEntity } from "./RoomEntity";
import { UserEntity } from "./UserEntity";

export class MessageEntity implements IMessageEntity,IAuditableEntity{

  @ApiProperty()
  id?: string;

  @ApiProperty()
  room: RoomEntity;

  @ApiProperty()
  content: string

  @ApiProperty()
  from: UserEntity;

  @ApiProperty()
  fromName: string;

  @ApiProperty({
    enum: STATUS_MESSAGE   
  })  
  status: STATUS_MESSAGE;

  @ApiProperty()
  file: FileEntity[];

  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  lastModifiedOn: Date;

  @ApiProperty()
  createdBy: string;  

}
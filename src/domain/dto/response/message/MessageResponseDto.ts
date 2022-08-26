import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";
import { IMessageEntity } from "src/domain/common/interfaces/entities/IMessageEntity";
import { FileEntity } from "src/domain/common/entities/FileEntity";
import { STATUS_MESSAGE } from "src/domain/common/enums/TypesData";
import { UserMessageResponse } from "./custom/UserMessageResponse";
import { RoomMessageResponse } from "./custom/RoomMessageResponse";

export class MessageResponseDto implements IMessageEntity, IAuditableEntity{
  
  @ApiProperty()
  id?: string;

  @ApiProperty()
  room: RoomMessageResponse;

  @ApiProperty()
  content: string;

  @ApiProperty()
  from: UserMessageResponse;

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

  createdBy: string;
}
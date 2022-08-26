import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IMessageEntity } from "src/domain/common/interfaces/entities/IMessageEntity";
import { FileEntity } from "src/domain/common/entities/FileEntity";
import { STATUS_MESSAGE } from "src/domain/common/enums/TypesData";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";

export class MessageUpdateRequestDto implements IMessageEntity, IAuditableEntity{

  id?: string;

  @ApiProperty()
  room: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  fromName: string;

  @ApiProperty({ enum: STATUS_MESSAGE })
  status: STATUS_MESSAGE;

  @ApiProperty()
  file: string[];    

  createdOn: Date;
  lastModifiedOn: Date;
  createdBy: string;    
}
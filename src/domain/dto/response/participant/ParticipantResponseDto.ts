import { ApiProperty } from "@nestjs/swagger";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";
import { IParticipantEntity } from "src/domain/common/interfaces/entities/IParticipantEntity";
import { RoomParticipantResponse } from "./custom/RoomParticipantResponse";
import { UserParticipantResponse } from "./custom/UserParticipantResponse";

export class ParticipantResponseDto implements IParticipantEntity, IAuditableEntity{
  
  @ApiProperty()
  id?: string;

  @ApiProperty()
  idUser: UserParticipantResponse;

  @ApiProperty()
  idRoom: RoomParticipantResponse;

  @ApiProperty()
  username: string;

  @ApiProperty()
  messagesUnRead: number;

  @ApiProperty()
  deleted: boolean;
 
  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  lastModifiedOn: Date;

  createdBy: string;
}
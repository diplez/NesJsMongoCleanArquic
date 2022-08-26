import { ApiProperty } from "@nestjs/swagger";
import { IAuditableEntity } from "../interfaces/auditable/IAuditableEntity";
import { IParticipantEntity } from "../interfaces/entities/IParticipantEntity";
import { RoomEntity } from "./RoomEntity";
import { UserEntity } from "./UserEntity";

export class ParticipantEntity implements IParticipantEntity, IAuditableEntity{
  
  @ApiProperty()
  id?: string;

  @ApiProperty()
  idUser: UserEntity;
  
  @ApiProperty()
  idRoom: RoomEntity;

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

  @ApiProperty()
  createdBy: string;
}
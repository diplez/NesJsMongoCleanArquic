//NATIVE
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";
import { IParticipantEntity } from "src/domain/common/interfaces/entities/IParticipantEntity";

export class ParticipantCreateRequestDto implements IParticipantEntity,IAuditableEntity{

  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idUser: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idRoom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  
  messagesUnRead: number;
  deleted: boolean;
  createdOn: Date;
  lastModifiedOn: Date;
  createdBy: string;

}
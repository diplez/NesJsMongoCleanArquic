//NATIVE
import { IsNotEmpty, IsOptional, IsString} from "class-validator";
import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
//CUSTOM
import { IRoomEntity } from "src/domain/common/interfaces/entities/IRoomEntitty";
import { ROOM_TYPE } from "src/domain/common/enums/TypesData";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";

/**
 * Request de creación de salas
 * @summary Request de creación de salas
 * @description Datos para crear datos de sala junto a participantes
 */
export class RoomCreateRequestDto implements IRoomEntity,IAuditableEntity{

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()  
  roomManager: string;

  lastMessage: string;

  @IsNotEmpty()
  @ApiProperty()
  cancelDate?: Date;

  @IsNotEmpty()
  @ApiProperty({
    enum: ROOM_TYPE
  })
  type: ROOM_TYPE;

  @IsNotEmpty()
  @ApiProperty()
  status: boolean;
  
  @IsNotEmpty()
  @ApiProperty()
  participants: RoomParticipantDto[];

  createdOn: Date;
  lastModifiedOn: Date;
  createdBy: string;

}

export class RoomParticipantDto{
  
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;
}

/**
 * Esquema para presentación en swagger
 */
export const CUSTOM_SCHEMA_ROOM_REQUEST = {
  allOf: [
    { $ref: getSchemaPath(RoomCreateRequestDto) },
    {
      properties: {
        participants: {
          type: "array",
          items: { 
            $ref: getSchemaPath(RoomParticipantDto)
          }
        },
      },
    },
  ],
}

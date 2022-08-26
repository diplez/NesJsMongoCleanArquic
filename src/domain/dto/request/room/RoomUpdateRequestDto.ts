//NATIVE
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IRoomEntity } from "src/domain/common/interfaces/entities/IRoomEntitty";
import { UserEntity } from "src/domain/common/entities/UserEntity";
import { ROOM_TYPE } from "src/domain/common/enums/TypesData";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";

export class RoomUpdateRequestDto implements IRoomEntity,IAuditableEntity{

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()  
  roomManager: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
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

  createdOn: Date;
  lastModifiedOn: Date;
  createdBy: string;

}
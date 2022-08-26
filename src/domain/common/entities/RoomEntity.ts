//NATIVE
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
//CUSTOM
import { ROOM_TYPE } from "../enums/TypesData";
import { IAuditableEntity } from "../interfaces/auditable/IAuditableEntity";
import { IRoomEntity } from "../interfaces/entities/IRoomEntitty";
import { UserEntity } from "./UserEntity";
import { MessageDocument } from "src/infrastructure/dal/models/Message.document";

export class RoomEntity implements IRoomEntity,IAuditableEntity{    
        
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;
  
    @ApiProperty()
    roomManager: UserEntity;
  
    @ApiProperty()
    lastMessage: MessageDocument;

    @ApiProperty()
    cancelDate?: Date;
    
    @ApiProperty({
        enum: ROOM_TYPE
    })
    type: ROOM_TYPE;
  
    @ApiProperty()
    status: boolean;

    @ApiProperty()
    createdOn: Date;

    @ApiProperty()
    lastModifiedOn: Date;

    @ApiProperty()
    createdBy: string;  
}
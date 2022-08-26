//NATIVE
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
//CUSTOM
import { ROOM_TYPE } from "../../enums/TypesData";
import { MessageDocument } from "src/infrastructure/dal/models/Message.document";
import { UserEntity } from "../../entities/UserEntity";
import { MessageEntity } from "../../entities/MessageEntity";
import { RoomDocument } from "src/infrastructure/dal/models/Room.document";
import { UserDocument } from "src/infrastructure/dal/models/User.document.";

export interface IRoomEntity {
    
    id?: string;
    name: string;
    roomManager: UserDocument | UserEntity | string;
    lastMessage: MessageEntity | MessageDocument | string;
    cancelDate?: Date;
    type: ROOM_TYPE;
    status: boolean;
}
import { RoomDocument } from "src/infrastructure/dal/models/Room.document";
import { UserDocument } from "src/infrastructure/dal/models/User.document.";
import { FileEntity } from "../../entities/FileEntity";
import { RoomEntity } from "../../entities/RoomEntity";
import { UserEntity } from "../../entities/UserEntity";
import { STATUS_MESSAGE } from "../../enums/TypesData";

export interface IMessageEntity{
        
    id?: string;
    room: RoomEntity | string | RoomDocument | any;    
    content: string    
    from: UserEntity | string | UserDocument | any;    
    fromName: string;
    status: STATUS_MESSAGE;
    file: FileEntity[] | string[];
}
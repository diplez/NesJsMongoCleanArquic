import { RoomDocument } from "src/infrastructure/dal/models/Room.document";
import { UserDocument } from "src/infrastructure/dal/models/User.document.";
import { RoomEntity } from "../../entities/RoomEntity";
import { UserEntity } from "../../entities/UserEntity";

export interface IParticipantEntity{

    id?: string;
    idUser: UserEntity | string | UserDocument | any;
    idRoom: RoomEntity | string | RoomDocument | any;
    username: string;
    messagesUnRead: number;
    deleted: boolean;
}
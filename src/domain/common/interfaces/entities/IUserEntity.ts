import { RoomDocument } from "src/infrastructure/dal/models/Room.document";
import { RoomEntity } from "../../entities/RoomEntity";
import { IAuditableEntity } from "../auditable/IAuditableEntity";

export interface IUserEntity{

  id?: string;
  name: string;
  lastname: string;
  username: string;
  room: string | RoomEntity | RoomDocument;
  avatar: string;
  active: boolean;
  socket?: string;  
}

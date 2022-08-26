import { ApiProperty } from "@nestjs/swagger";
import { MessageEntity } from "src/domain/common/entities/MessageEntity";
import { RoomEntity } from "src/domain/common/entities/RoomEntity";
import { UserEntity } from "src/domain/common/entities/UserEntity";
import { ROOM_TYPE } from "src/domain/common/enums/TypesData";
import { IRoomEntity } from "src/domain/common/interfaces/entities/IRoomEntitty";

export class RoomMessageResponse implements IRoomEntity {
  
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  cancelDate?: Date;

  @ApiProperty()
  type: ROOM_TYPE;

  @ApiProperty()
  status: boolean;
  
  roomManager: UserEntity;
  lastMessage: MessageEntity;
  
}
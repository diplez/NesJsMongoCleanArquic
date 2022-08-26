import { ApiProperty } from "@nestjs/swagger";
import { IUserEntity } from "src/domain/common/interfaces/entities/IUserEntity";

export class UserMessageResponse implements IUserEntity {

  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  avatar: string;

  room: string;  
  active: boolean;
  socket?: string;
}

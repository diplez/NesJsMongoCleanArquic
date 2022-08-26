import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionConstants } from 'src/domain/common/constants/CollectionConstants';
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';
import { ROOM_TYPE } from 'src/domain/common/enums/TypesData';
import { SchemaTypes } from 'mongoose'; 
import { UserDocument } from './User.document.';
import { MessageDocument } from './Message.document';
import { IRoomEntity } from 'src/domain/common/interfaces/entities/IRoomEntitty';

@Schema({ collection: CollectionConstants.ROOM_COLLECTION })
export class RoomDocument extends AuditableEntity implements IRoomEntity{

  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.USER_NAME  })
  roomManager: UserDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.MESSAGE_NAME}) //Se usa constantes en caso especiales, debido a quee no deja relacionar bien de forma bidireccional, adicional se debe colocar de tipo string
  lastMessage: MessageDocument | string;

  @Prop()
  cancelDate?: Date;
  
  @Prop({enum: ROOM_TYPE, default: ROOM_TYPE.MULTIPLE})
  type: ROOM_TYPE;

  @Prop({default: false})
  status: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(RoomDocument);
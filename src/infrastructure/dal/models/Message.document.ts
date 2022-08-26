import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionConstants } from 'src/domain/common/constants/CollectionConstants';
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';
import { SchemaTypes } from 'mongoose'; 
import { UserDocument } from './User.document.';
import { RoomDocument } from './Room.document';
import { STATUS_MESSAGE } from 'src/domain/common/enums/TypesData';
import { FileDocument } from './File.document';
import { IMessageEntity } from 'src/domain/common/interfaces/entities/IMessageEntity';

@Schema({ collection: CollectionConstants.MESSAGE_COLLECTION })
export class MessageDocument extends AuditableEntity implements IMessageEntity{
  
  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.ROOM_NAME })
  room: RoomDocument | string;

  @Prop({length: 2000})
  content: string

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.USER_NAME })
  from: UserDocument;

  @Prop({length: 100})
  fromName: string;

  @Prop({enum: STATUS_MESSAGE, default: STATUS_MESSAGE.ENVIANDO})
  status: STATUS_MESSAGE;

  @Prop({ type: [SchemaTypes.ObjectId], ref: FileDocument.name})
  file: FileDocument[] | string[];
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
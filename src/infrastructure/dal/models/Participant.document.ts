import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionConstants } from 'src/domain/common/constants/CollectionConstants';
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';
import { SchemaTypes } from 'mongoose'; 
import { UserDocument } from './User.document.';
import { RoomDocument } from './Room.document';
import { IParticipantEntity } from 'src/domain/common/interfaces/entities/IParticipantEntity';

@Schema({ collection: CollectionConstants.PARTICIPANT_COLLECTION })
export class ParticipantDocument extends AuditableEntity implements IParticipantEntity{
  
  @Prop({ type: SchemaTypes.ObjectId, ref: UserDocument.name})
  idUser: UserDocument;
  
  @Prop({ type: SchemaTypes.ObjectId, ref: RoomDocument.name })
  idRoom: RoomDocument | string;

  @Prop({length: 50})
  username: string;

  @Prop({default: 0})
  messagesUnRead: number;

  @Prop({default: false})
  deleted: boolean;  
}

export const ParticipantSchema = SchemaFactory.createForClass(ParticipantDocument);
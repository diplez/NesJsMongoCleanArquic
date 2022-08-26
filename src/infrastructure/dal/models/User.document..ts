import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionConstants } from 'src/domain/common/constants/CollectionConstants';
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';
import { SchemaTypes } from 'mongoose';
import { IUserEntity } from 'src/domain/common/interfaces/entities/IUserEntity';
 ;

@Schema({ collection: CollectionConstants.USER_COLLECTION })
export class UserDocument extends AuditableEntity implements IUserEntity{

  @Prop({length: 100})
  name: string;

  @Prop({length: 100})
  lastname: string;

  @Prop({unique: true, length: 50})
  username: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.ROOM_NAME }) //Se usa constantes en caso especiales, debido a quee no deja relacionar bien de forma bidireccional, adicional se debe colocar de tipo string
  room: string;  

  @Prop()
  avatar: string;

  @Prop({default: false})
  active: boolean;

  @Prop()
  socket?: string;  
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
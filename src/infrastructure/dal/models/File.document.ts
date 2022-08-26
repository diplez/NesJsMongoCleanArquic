import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CollectionConstants } from 'src/domain/common/constants/CollectionConstants';
import { AuditableEntity } from 'src/domain/common/entities/auditable/AuditableEntity';
import { STATUS_MESSAGE, TYPE_FILE } from 'src/domain/common/enums/TypesData';
import { IFileEntity } from 'src/domain/common/interfaces/entities/IFileEntity';
import { MessageDocument } from './Message.document';

@Schema({ collection: CollectionConstants.FILE_COLLECTION })
export class FileDocument extends AuditableEntity implements IFileEntity{

  @Prop({length: 100})
  name: string;

  @Prop({default: 0})
  sizeFile: number;

  @Prop({enum: TYPE_FILE, default: TYPE_FILE.OTHERS})
  typeFile: TYPE_FILE;

  @Prop()
  urlFileDownload : string;

  @Prop()
  urlFileView:string; 
  
  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionConstants.MESSAGE_NAME })
  message: string;
}

export const FileSchema = SchemaFactory.createForClass(FileDocument);
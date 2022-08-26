import { MessageDocument } from "src/infrastructure/dal/models/Message.document";
import { MessageEntity } from "../../entities/MessageEntity";
import { TYPE_FILE } from "../../enums/TypesData";

export interface IFileEntity{
  
  id?: string;
  name: string;
  sizeFile: number;
  typeFile: TYPE_FILE;
  urlFileDownload : string;
  urlFileView:string;
  message?: MessageEntity | string | MessageDocument
}
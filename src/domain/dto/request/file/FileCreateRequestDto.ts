import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IMessageEntity } from "src/domain/common/interfaces/entities/IMessageEntity";
import { FileEntity } from "src/domain/common/entities/FileEntity";
import { STATUS_MESSAGE, TYPE_FILE } from "src/domain/common/enums/TypesData";
import { IFileEntity } from "src/domain/common/interfaces/entities/IFileEntity";
import { MessageEntity } from "src/domain/common/entities/MessageEntity";
import { MessageDocument } from "src/infrastructure/dal/models/Message.document";
import { IsNotEmpty } from "class-validator";

export class FileCreateRequestDto implements IFileEntity{

  id?: string; 

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  sizeFile: number;

  @IsNotEmpty()
  @ApiProperty()
  typeFile: TYPE_FILE;

  @IsNotEmpty()
  @ApiProperty()
  urlFileDownload: string;

  @IsNotEmpty()
  @ApiProperty()
  urlFileView: string;
  
  @IsNotEmpty()
  @ApiProperty()
  message?: string;
       
}
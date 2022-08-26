import { ApiProperty } from "@nestjs/swagger";
import { TYPE_FILE } from "../enums/TypesData";
import { IAuditableEntity } from "../interfaces/auditable/IAuditableEntity";
import { IFileEntity } from "../interfaces/entities/IFileEntity";

export class FileEntity implements IFileEntity,IAuditableEntity{

  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sizeFile: number;

  @ApiProperty({
    enum: TYPE_FILE
  })
  typeFile: TYPE_FILE;

  @ApiProperty()
  urlFileDownload : string;

  @ApiProperty()
  urlFileView:string;  

  @ApiProperty()
  createdOn: Date;

  @ApiProperty()
  lastModifiedOn: Date;

  @ApiProperty()
  createdBy: string;

}
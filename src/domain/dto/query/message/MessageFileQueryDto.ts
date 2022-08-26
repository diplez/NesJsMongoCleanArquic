import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
//CUSTOM
import { TYPE_FILE } from 'src/domain/common/enums/TypesData';
import { PaginationQueryDto } from '../../generic/PaginationQueryDto';

export class MessageFileQueryDto extends PaginationQueryDto{

  @IsNotEmpty()
  @ApiProperty({enum:TYPE_FILE})
  typeFile: TYPE_FILE;
    
}

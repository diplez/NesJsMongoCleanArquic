import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {

  @IsOptional()
  @IsPositive()
  @ApiProperty({ default: 1})
  page: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ default: 10})
  limit: number;
}

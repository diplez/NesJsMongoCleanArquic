import { IUserEntity } from "src/domain/common/interfaces/entities/IUserEntity";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";

export class UserUpdateRequestDto implements IUserEntity,IAuditableEntity{
    
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  room: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;

  @IsNotEmpty()
  @ApiProperty()
  active: boolean;
  
  socket?: string;

  createdOn: Date;
  
  lastModifiedOn: Date;

  createdBy: string;
}
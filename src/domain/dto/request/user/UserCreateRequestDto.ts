//NATIVE
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { IUserEntity } from "src/domain/common/interfaces/entities/IUserEntity";
import { IAuditableEntity } from "src/domain/common/interfaces/auditable/IAuditableEntity";

export class UserCreateRequestDto implements IUserEntity,IAuditableEntity{
    
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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

  @IsOptional()
  socket?: string;

  createdOn: Date;
  
  lastModifiedOn: Date;

  createdBy: string;
}
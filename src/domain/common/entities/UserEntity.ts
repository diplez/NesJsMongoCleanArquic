import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { IAuditableEntity } from "../interfaces/auditable/IAuditableEntity";
import { IUserEntity } from "../interfaces/entities/IUserEntity";

export class UserEntity implements IUserEntity,IAuditableEntity{    

    @ApiProperty()
    id?: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    room: string;

    @ApiProperty()
    avatar: string;
    
    @ApiProperty()
    active: boolean;

    @ApiProperty()
    socket?: string;  

    @ApiProperty()
    createdOn: Date;

    @ApiProperty()
    lastModifiedOn: Date;

    @ApiProperty()
    createdBy: string;    
}
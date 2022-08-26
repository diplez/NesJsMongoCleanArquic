import { ApiProperty } from "@nestjs/swagger";
//CUSTOM
import { TYPE_FILE } from "src/domain/common/enums/TypesData"

export class FileResponseTotalDto{
    
    @ApiProperty()
    id? : string;
    
    @ApiProperty()
    type: TYPE_FILE;
    
    @ApiProperty()
    total: Number;

    @ApiProperty()
    sizeFiles : number;
}
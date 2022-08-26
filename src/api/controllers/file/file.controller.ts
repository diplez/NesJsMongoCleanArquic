import { Body, Controller, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUseCase } from 'src/application/file/File.Use.Case';
import { ApiOkCustomResponseArray } from 'src/domain/decorators/ApiCustomResponse';
import { PaginationQueryDto } from 'src/domain/dto/generic/PaginationQueryDto';
import { ResponseRest } from 'src/domain/dto/generic/ResponseRest';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { FileCreateRequestDto } from 'src/domain/dto/request/file/FileCreateRequestDto';
import { FileUpdateRequestDto } from 'src/domain/dto/request/file/FileUpdateRequestDto';
import { FileResponseDto } from 'src/domain/dto/response/file/FileResponseDto';
import { FileResponseTotalDto } from 'src/domain/dto/response/file/FileResponseTotalDto';

@ApiTags('Archivos')
@Controller(`files`)
@ApiExtraModels(ResponseRest,FileResponseDto,PaginationQueryDto,FileResponseTotalDto)
export class FileController {
  
  private readonly logger = new Logger(FileController.name);
  
  constructor(
    private readonly fileUseCase : FileUseCase,
  ){}

  @Post()
  @ApiOperation({
    summary: 'Crea archivos',
    description: 'Creación de archivos'
  })
  @ApiCreatedResponse({
    description: "Created"
  })
  @ApiBody({ type: FileCreateRequestDto})
  async create(@Body() createParticipantDto: FileCreateRequestDto): Promise<string> {    
    let result = await this.fileUseCase.create(createParticipantDto);
    return result;
  }

  @Get('room/:id')
  @ApiOperation({
    summary: 'Obtiene los archivos por ID',
    description: 'Obtiene los archivos por ID'
  })
  @ApiOkCustomResponseArray(FileResponseDto)
  async findFilesMessageByRoomId(@Param('id') id: string,@Query() messageFileQuery: MessageFileQueryDto): Promise<ResponseRest<FileResponseDto[]>> {    
    let result = await this.fileUseCase.getFilesMessageByRoomId(id,messageFileQuery);
    return new ResponseRest<FileResponseDto[]>().Ok(result);    
  }

  @Get('room/:id/total')
  @ApiOperation({
    summary: 'Obtiene los archivos por ID',
    description: 'Obtiene los archivos por ID'
  })
  @ApiOkCustomResponseArray(FileResponseTotalDto)
  async findTotalByRoomId(@Param('id') id: string): Promise<ResponseRest<FileResponseTotalDto[]>> {    
    let result = await this.fileUseCase.getTotalByRoomId(id);
    return new ResponseRest<FileResponseTotalDto[]>().Ok(result);    
  }

  @Put(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async update(@Param('id') id: string, @Body() updateFileDto: FileUpdateRequestDto) : Promise<void>{
    await this.fileUseCase.update(id, updateFileDto);
  }  
}

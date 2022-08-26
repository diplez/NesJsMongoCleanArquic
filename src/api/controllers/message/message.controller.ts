import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MessageUseCase } from 'src/application/message/Message.Use.Case';
import { ApiOkCustomResponseArray, ApiOkCustomResponseSingle } from 'src/domain/decorators/ApiCustomResponse';
import { PaginationQueryDto } from 'src/domain/dto/generic/PaginationQueryDto';
import { ResponseRest } from 'src/domain/dto/generic/ResponseRest';
import { MessageFileQueryDto } from 'src/domain/dto/query/message/MessageFileQueryDto';
import { MessageCreateRequestDto } from 'src/domain/dto/request/message/MessageCreateRequestDto';
import { MessageUpdateRequestDto } from 'src/domain/dto/request/message/MessageUpdateRequestDto';
import { ParticipantUpdateRequestDto } from 'src/domain/dto/request/participant/ParticipantUpdateRequestDto';
import { FileResponseDto } from 'src/domain/dto/response/file/FileResponseDto';
import { MessageResponseDto } from 'src/domain/dto/response/message/MessageResponseDto';

@ApiTags('Mensajes')
@Controller(`messages`)
@ApiExtraModels(ResponseRest,MessageResponseDto,PaginationQueryDto)
export class MessageController {
  
  private readonly logger = new Logger(MessageController.name);

  constructor(
    private readonly messageUseCase : MessageUseCase,
  ){}

  @Post()
  @ApiOperation({
    summary: 'Crea mensajes',
    description: 'Creación de mensajes'
  })
  @ApiCreatedResponse({
    description: "Created"
  })
  @ApiBody({ type: MessageCreateRequestDto})
  async create(@Body() createParticipantDto: MessageCreateRequestDto): Promise<string> {    
    let result = await this.messageUseCase.create(createParticipantDto);
    return result;
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los mensajes',
    description: 'Obtiene todos los mensajes'
  })
  @ApiOkCustomResponseArray(MessageResponseDto)  
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<ResponseRest<MessageResponseDto[]>> {    
    let result = await this.messageUseCase.getAll(paginationQuery);
    return new ResponseRest<MessageResponseDto[]>().Ok(result);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Obtiene los mensajes por ID',
    description: 'Obtiene los mensajes por ID'
  })
  @ApiOkCustomResponseSingle(MessageResponseDto)
  async findById(@Param('id') id: string): Promise<ResponseRest<MessageResponseDto>> {    
    let result = await this.messageUseCase.getById(id);
    return new ResponseRest<MessageResponseDto>().Ok(result);
  }

  @Put(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async update(@Param('id') id: string, @Body() updateMessageDto: MessageUpdateRequestDto) : Promise<void>{
    await this.messageUseCase.update(id, updateMessageDto);
  }

  @Delete(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async delete(@Param('id') id: string) : Promise<void>{
    await this.messageUseCase.delete(id);
  } 

  @Get('room/:id')
  @ApiOperation({
    summary: 'Obtiene los mensajes por ID',
    description: 'Obtiene los mensajes por ID'
  })
  @ApiOkCustomResponseArray(MessageResponseDto)
  async findByRoomId(@Param('id') id: string,@Query() paginationQuery: PaginationQueryDto): Promise<ResponseRest<MessageResponseDto[]>> {    
    let result = await this.messageUseCase.getByRoomId(id,paginationQuery);
    return new ResponseRest<MessageResponseDto[]>().Ok(result);
  }
}

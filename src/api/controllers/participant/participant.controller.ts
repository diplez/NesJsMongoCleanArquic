import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipantUseCase } from 'src/application/participant/Participant.Use.Case';
import { ApiOkCustomResponseArray, ApiOkCustomResponseSingle } from 'src/domain/decorators/ApiCustomResponse';
import { ResponseRest } from 'src/domain/dto/generic/ResponseRest';
import { ParticipantCreateRequestDto } from 'src/domain/dto/request/participant/ParticipantCreateRequestDto';
import { ParticipantUpdateRequestDto } from 'src/domain/dto/request/participant/ParticipantUpdateRequestDto';
import { ParticipantResponseDto } from 'src/domain/dto/response/participant/ParticipantResponseDto';
import { RoomResponseDto } from 'src/domain/dto/response/room/RoomResponseDto';

@ApiTags('Participantes')
@Controller(`participants`)
@ApiExtraModels(ResponseRest,ParticipantResponseDto,ParticipantCreateRequestDto)
export class ParticipantController {
  
  private readonly logger = new Logger(ParticipantController.name);

  constructor(
    private readonly participantUseCase : ParticipantUseCase,
  ){}

  @Post()
  @ApiOperation({
    summary: 'Crea participantes',
    description: 'Creación de participantes'
  })
  @ApiCreatedResponse({
    description: "Created"
  })
  @ApiBody({ type: ParticipantCreateRequestDto})
  async create(@Body() createParticipantDto: ParticipantCreateRequestDto): Promise<string> {    
    let result = await this.participantUseCase.create(createParticipantDto);
    return result;
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los participantes',
    description: 'Obtiene todos los participantes'
  })
  @ApiOkCustomResponseArray(ParticipantResponseDto)
  async findAll(): Promise<ResponseRest<ParticipantResponseDto[]>> {    
    let result = await this.participantUseCase.getAll();
    return new ResponseRest<ParticipantResponseDto[]>().Ok(result);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Obtiene los participantes por ID',
    description: 'Obtiene los participantes por ID'
  })
  @ApiOkCustomResponseSingle(ParticipantResponseDto)
  async findById(@Param('id') id: string): Promise<ResponseRest<ParticipantResponseDto>> {    
    let result = await this.participantUseCase.getById(id);
    return new ResponseRest<ParticipantResponseDto>().Ok(result);
  }

  @Get('room/:id')
  @ApiOperation({
    summary: 'Obtiene los participantes por ID de sala',
    description: 'Obtiene los participantes por ID de sala'
  })
  @ApiOkCustomResponseArray(ParticipantResponseDto)
  async findByRoomId(@Param('id') id: string): Promise<ResponseRest<ParticipantResponseDto[]>> {    
    let result = await this.participantUseCase.getByRoomID(id);
    return new ResponseRest<ParticipantResponseDto[]>().Ok(result);
  }

  @Put(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async update(@Param('id') id: string, @Body() updateParticipantDto: ParticipantUpdateRequestDto) : Promise<void>{
    await this.participantUseCase.update(id, updateParticipantDto);
  }

  @Delete(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async delete(@Param('id') id: string) : Promise<void>{
    await this.participantUseCase.delete(id);
  } 
  
}

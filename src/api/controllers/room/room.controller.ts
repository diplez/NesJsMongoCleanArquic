import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RoomUseCase } from 'src/application/room/Room.Use.Case';
import { ApiOkCustomResponseArray, ApiOkCustomResponseSingle } from 'src/domain/decorators/ApiCustomResponse';
import { ResponseRest } from 'src/domain/dto/generic/ResponseRest';
import { CUSTOM_SCHEMA_ROOM_REQUEST, RoomCreateRequestDto, RoomParticipantDto } from 'src/domain/dto/request/room/RoomCreateRequestDto';
import { RoomUpdateRequestDto } from 'src/domain/dto/request/room/RoomUpdateRequestDto';
import { RoomResponseDto } from 'src/domain/dto/response/room/RoomResponseDto';

@ApiTags('Salas')
@Controller(`rooms`)
@ApiExtraModels(ResponseRest,RoomResponseDto,RoomCreateRequestDto,RoomParticipantDto)
export class RoomController {

  private readonly logger = new Logger(RoomController.name);

  constructor(
    private readonly roomUseCase : RoomUseCase,
  ){}

  @Post()
  @ApiOperation({
    summary: 'Crea salas',
    description: 'Creación de salas'
  })
  @ApiCreatedResponse({
    description: "Created"
  })
  @ApiBody({
    schema: CUSTOM_SCHEMA_ROOM_REQUEST
  })
  async create(@Body() createRoomDto: RoomCreateRequestDto): Promise<string> {    
    let result = await this.roomUseCase.create(createRoomDto);
    return result;
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los salas',
    description: 'Obtiene todos los salas'
  })
  @ApiOkCustomResponseArray(RoomResponseDto)
  async findAll(): Promise<ResponseRest<RoomResponseDto[]>> {    
    let result = await this.roomUseCase.getAll();
    return new ResponseRest<RoomResponseDto[]>().Ok(result);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Obtiene los salas por ID',
    description: 'Obtiene los salas por ID'
  })
  @ApiOkCustomResponseSingle(RoomResponseDto)
  async findById(@Param('id') id: string): Promise<ResponseRest<RoomResponseDto>> {    
    let result = await this.roomUseCase.getById(id);
    return new ResponseRest<RoomResponseDto>().Ok(result);
  }

  @Put(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async update(@Param('id') id: string, @Body() updateRoomDto: RoomUpdateRequestDto) : Promise<void>{
    await this.roomUseCase.update(id, updateRoomDto);
  }

  @Delete(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async delete(@Param('id') id: string) : Promise<void>{
    await this.roomUseCase.delete(id);
  } 

  @Get('user/:username')
  @ApiOperation({
    summary: 'Obtiene los salas por ID',
    description: 'Obtiene los salas por ID'
  })
  @ApiOkCustomResponseArray(RoomResponseDto)
  async findByUsername(@Param('username') username: string): Promise<ResponseRest<RoomResponseDto[]>> {    
    let result = await this.roomUseCase.getByUsername(username);
    return new ResponseRest<RoomResponseDto[]>().Ok(result);
  }
}

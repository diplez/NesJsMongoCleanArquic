import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUseCase } from 'src/application/user/User.Use.Case';
import { ApiOkCustomResponseArray, ApiOkCustomResponseSingle } from 'src/domain/decorators/ApiCustomResponse';
import { ResponseRest } from 'src/domain/dto/generic/ResponseRest';
import { UserCreateRequestDto } from 'src/domain/dto/request/user/UserCreateRequestDto';
import { UserUpdateRequestDto } from 'src/domain/dto/request/user/UserUpdateRequestDto';
import { UserResponseDto } from 'src/domain/dto/response/User/UserResponseDto';

@ApiTags('Usuarios')
@Controller(`users`)
@ApiExtraModels(ResponseRest,UserResponseDto)
export class UserController {

  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userUseCase : UserUseCase,
  ){}

  @Post()
  @ApiOperation({
    summary: 'Crea usuarios',
    description: 'Creación de usuarios'
  })
  @ApiCreatedResponse()
  async create(@Body() createUserDto: UserCreateRequestDto): Promise<string> {    
    let result = await this.userUseCase.create(createUserDto);
    return result;
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los usuarios',
    description: 'Obtiene todos los usuarios'
  })
  @ApiOkCustomResponseArray(UserResponseDto)
  async findAll(): Promise<ResponseRest<UserResponseDto[]>> {    
    let result = await this.userUseCase.getAll();
    return new ResponseRest<UserResponseDto[]>().Ok(result);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Obtiene los usuarios por ID',
    description: 'Obtiene los usuarios por ID'
  })
  @ApiOkCustomResponseSingle(UserResponseDto)
  async findById(@Param('id') id: string): Promise<ResponseRest<UserResponseDto>> {    
    let result = await this.userUseCase.getById(id);
    return new ResponseRest<UserResponseDto>().Ok(result);
  }

  @Put(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateRequestDto) : Promise<void>{
    await this.userUseCase.update(id, updateUserDto);
  }

  @Delete(':id')  
  @ApiOkResponse({
    description: "Ok"
  })
  async delete(@Param('id') id: string) : Promise<void>{
    await this.userUseCase.delete(id);
  }
}



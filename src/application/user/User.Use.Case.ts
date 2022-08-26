//NATIVE
import { Injectable, Logger} from '@nestjs/common';
import { UserCreateRequestDto } from 'src/domain/dto/request/user/UserCreateRequestDto';
import { UserUpdateRequestDto } from 'src/domain/dto/request/user/UserUpdateRequestDto';
import { ExampleResponse } from 'src/domain/dto/response/ExampleResponse';
import { UserResponseDto } from 'src/domain/dto/response/User/UserResponseDto';
import { UserDocument } from 'src/infrastructure/dal/models/User.document.';
import { UserRepository } from 'src/infrastructure/dal/repositories';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';
//CUSTOM

@Injectable()
export class UserUseCase {
  
  private readonly logger = new Logger(UserUseCase.name);

  constructor(
    private userRepository : UserRepository,
    private mapper: MapperDto
    ) {}

  async getAll(): Promise<UserResponseDto[]> {
    this.logger.log('Se obtiene todos los datos de usuarios');
    let data = await this.userRepository.findAll();
    return  data.map(x => (this.mapper.userDocumentToEntity(x))) as UserResponseDto[];
  }

  async getById(id: string): Promise<UserResponseDto> {
    this.logger.log(`Se busca usuario con id -> ${id}`);
    let data = await this.userRepository.findById(id);
    return this.mapper.userDocumentToEntity(data) as UserResponseDto;
  }

  async create(createUserDto: UserCreateRequestDto): Promise<string> {
    this.logger.log(`Se crea usuario con name -> ${createUserDto.name}`);
    const user = await this.userRepository.create(createUserDto);
    return user.id;
  }

  async update(id: string, updateUserDto: UserUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza usuario con name -> ${updateUserDto.name}`);
    updateUserDto.lastModifiedOn = new Date(Date.now());
    await this.userRepository.update({id: id},updateUserDto);
  }

  async updateBySocketId(id: string, updateUserDto: UserUpdateRequestDto): Promise<void> {
    this.logger.log(`Se actualiza usuario con socket -> ${id}`);
    updateUserDto.lastModifiedOn = new Date(Date.now());
    await this.userRepository.update({socket: id},updateUserDto);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Se elimina usuario con id -> ${id}`);
    await this.userRepository.deleteOne({id:id});
  }
}
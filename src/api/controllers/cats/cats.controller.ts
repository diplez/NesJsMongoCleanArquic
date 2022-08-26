import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { IExampleRepositoryTest } from 'src/infrastructure/dal/repositories/IExampleRepository';
import { ObjectID } from 'mongodb';
import { ExampleDocument } from 'src/infrastructure/dal/models/Example.document';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ExampleUseCase } from 'src/application/example/Example.Use.Case';

@ApiTags('Examples')
@Controller('cats')
export class CatsController {

  private readonly logger = new Logger(ExampleUseCase.name);

  constructor(        
    private readonly ser : ExampleUseCase,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    let data = await this.ser.getAllPostsByUser(1);      
    this.logger.log("hola desde gatos");
    return "hola desde gatos";
  }
}

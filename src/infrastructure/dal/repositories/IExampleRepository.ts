import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { CreateCatDto } from 'src/domain/dto/request/Example.request';
import { ExampleDocument } from 'src/infrastructure/dal/models/Example.document';
import { Repository } from 'typeorm';
import { GenericRepository } from './generic/GenericRepository';

@Injectable()
export  class IExampleRepositoryTest extends GenericRepository<ExampleDocument> {  

  private readonly logger = new Logger(IExampleRepositoryTest.name)
  
  constructor(
    @InjectModel(ExampleDocument.name)
    private usersRepository: Model<ExampleDocument>,
  ) {
    super(usersRepository, new Logger(IExampleRepositoryTest.name));
  }

  findOne(id: string): Promise<ExampleDocument> {        
    return null ;
  }
}
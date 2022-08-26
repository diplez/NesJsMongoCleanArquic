//NATIVE
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ExampleResponse } from 'src/domain/dto/response/ExampleResponse';
import { IExampleRepositoryTest } from 'src/infrastructure/dal/repositories/IExampleRepository';
import { ObjectID } from 'mongodb';
import { ExampleDocument } from 'src/infrastructure/dal/models/Example.document';
import { CreateCatDto } from 'src/domain/dto/request/Example.request';
//CUSTOM


@Injectable()
export class ExampleUseCase {
  
  private readonly logger = new Logger(ExampleUseCase.name);

  constructor(
    private exampleRepository : IExampleRepositoryTest,
    //private exampleRepositorytest : IExampleRepositoryTestOne
    ) {}

  async getAllPostsByUser(userId: number): Promise<ExampleResponse> {
    //this.logger.log('Fetch all user`s posts');

    const user = await this.exampleRepository.findById('61899f714bd77d3928c359d4');  
    /***let obt = new CreateCatDto();
    obt.animalType= "Diego lopez";
    obt.name= "Suco";
    obt.birthDate= new Date();
    obt.pictureUrl= "pintura 5";  
    await this.exampleRepository.create(obt);**/

    /**let obt1 = new ExampleOneTestDocument();    
    obt1.name= "Relacionado";
    obt1.profile =  user[0].id;

    await this.exampleRepositorytest.addAsynctest(obt1);**/

    //const test = await this.exampleRepositorytest.findAll();
    
    this.logger.log('ESTAMOS EN CASE'+JSON.stringify(user));
    this.logger.log(ExampleDocument.name+' ----------  ')

    return null;
  }
}
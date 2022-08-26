import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import * as repositories from 'src/infrastructure/dal/repositories';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { MapperDto } from 'src/infrastructure/services/mapper/MapperDto';

@Module({
 imports:[
  InfrastructureModule,
  AutomapperModule.forRoot({
    options: [{ name: 'classMapper', pluginInitializer: classes }],
    singular: true,
  }),
 ],
 providers: [
  MapperDto,
  repositories.IExampleRepositoryTest,
  repositories.UserRepository,
  repositories.RoomRepository,
  repositories.ParticipantRepository,
  repositories.MessageRepository,
  repositories.FileRepository
 ],
 exports: [
  MapperDto,
  repositories.IExampleRepositoryTest,
  repositories.UserRepository,
  repositories.RoomRepository,
  repositories.ParticipantRepository,
  repositories.MessageRepository,
  repositories.FileRepository
 ]
})
export class ApplicationModule {}

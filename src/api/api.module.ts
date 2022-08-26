import { Module } from '@nestjs/common';
//CUSTOM
import { ApplicationModule } from 'src/application/application.module';
import { ExampleUseCase } from 'src/application/example/Example.Use.Case';
import { FileUseCase } from 'src/application/file/File.Use.Case';
import { MessageUseCase } from 'src/application/message/Message.Use.Case';
import { ParticipantUseCase } from 'src/application/participant/Participant.Use.Case';
import { RoomUseCase } from 'src/application/room/Room.Use.Case';
import { UserUseCase } from 'src/application/user/User.Use.Case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { CatsController } from './controllers/cats/cats.controller';
import { FileController } from './controllers/file/file.controller';
import { MessageController } from './controllers/message/message.controller';
import { ParticipantController } from './controllers/participant/participant.controller';
import { RoomController } from './controllers/room/room.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports:[
    ApplicationModule,
    InfrastructureModule
  ],
  controllers: [
    CatsController,
    FileController,
    MessageController,
    ParticipantController,
    UserController,
    RoomController
  ],
  providers: [
    ExampleUseCase,
    FileUseCase,
    MessageUseCase,
    ParticipantUseCase,
    UserUseCase,
    RoomUseCase
  ]
})
export class ApiModule {}

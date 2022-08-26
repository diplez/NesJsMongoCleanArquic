import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { UserUseCase } from 'src/application/user/User.Use.Case';
import { EventsGateway } from './sockets/events.gateway';

@Module({
  imports:[
    ApplicationModule
  ],
  providers: [
    EventsGateway,
    UserUseCase
  ]
})
export class GatewayModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ApiModule,     
    DomainModule,    
    ConfigModule.forRoot(),
    GatewayModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsAdapter } from '@nestjs/platform-ws';
import { SocketIoAdapter } from './infrastructure/adapters/socket/socket-io.adapter';
import { LoggerService } from './infrastructure/services/Logging/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { RouteConstants } from './domain/common/constants/RouteConstants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true,
    //logger: ['error', 'warn','debug','verbose','log'],
    logger: new LoggerService()
  });

  const cors = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, //Activar para funcionamiento de gateway (socket)
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ]
  };  
  app.useWebSocketAdapter(new SocketIoAdapter(app,cors));

  app.setGlobalPrefix(RouteConstants.API_BASE);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.enableCors(cors);

  //app.useWebSocketAdapter(new WsAdapter(app));
  //app.useWebSocketAdapter(new IoAdapter(app))

  const config = new DocumentBuilder()
    .setTitle('Genus Académico Chat')
    .setDescription('Chat de la plataforma Genus')
    .setVersion('1.0')    
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()} ${process.env.MONGODB_CONNECTION_STRING}`);

}
bootstrap();

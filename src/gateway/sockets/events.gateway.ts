import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UserUseCase } from 'src/application/user/User.Use.Case';
import { UserUpdateRequestDto } from 'src/domain/dto/request/user/UserUpdateRequestDto';
import { UserInDto } from 'src/domain/dto/sockets/in/UserInDto';
import { CHAT_EVENTS } from 'src/domain/common/enums/TypesEventSocket';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger(EventsGateway.name);

  constructor(
    private readonly userUseCase : UserUseCase,
  ){}

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  /**
   * Evento se activa cuando conecta luego de iniciar socket
   * @summary Evento se activa cuando conecta luego de iniciar socket
   * @description Evento se activa cuando conecta luego de iniciar socket
   * @param server 
   */
  afterInit(server: Server) {
    this.logger.log('Init');
  }  

  /**
   * Evento se activa cuando conecta al socket
   * @summary Evento se activa cuando conecta al socket
   * @description Evento se activa cuando conecta al socket
   * @param client 
   * @param args 
   */
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Evento se activa cuando desconecta de socket
   * @summary Evento se activa cuando desconecta de socket
   * @description Evento se activa cuando desconecta de socket
   * @param client 
   */
  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    let user = new UserUpdateRequestDto();
    user.active = false;
    this.userUseCase.updateBySocketId(client.id,user);
  }

  /**
   * Evento que maneja login de autenticación de socket
   * @summary Evento que maneja login de autenticación de socket
   * @description Evento que maneja login de autenticación de socket
   * @param client 
   * @param payload 
   */
  @SubscribeMessage(CHAT_EVENTS.LOGIN)
  async handleLogin(client: Socket, payload: UserInDto, callback): Promise<void> {
    this.server.emit('msgToClient', payload);
  }
}

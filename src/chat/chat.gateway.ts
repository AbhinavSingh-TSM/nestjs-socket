import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    console.log('first message', message);
    this.server.emit('message', 'Hello from server');
    return 'Hello world!';
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    console.log(data, 'is coming from client');
    this.server.emit('message', `data is ${data}`);
    return data;
  }
}

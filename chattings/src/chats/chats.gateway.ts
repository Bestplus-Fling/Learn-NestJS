import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  // front browser에서 보낸 event 이름을 추가
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // emit으로 보낸 데이터는 on으로 받을 수 있음
    // socket.on('new_user', username)
    console.log(socket.id);
    console.log(username);
    socket.emit('hello_user', 'hello ' + username);
    return 'hello world';
  }
}

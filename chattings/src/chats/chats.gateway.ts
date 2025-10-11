import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  /* 생성 주기
    1. constructor(생성자)
    2. afterInit(OnGatewayInit 이후)
      - 게이트웨이가 실행이 될 때, 가장 먼저 실행(단, 생성자 다음)
    3. handleConnection
      - Gateway의 연결이 정상적으로 완료된 경우
  */

  constructor() {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    // socket.id: 소켓 아이디(자동생성) socket.nsp(네임 스페이스의).name(이름)
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  // front browser에서 보낸 event 이름을 추가
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // emit으로 보낸 데이터는 on으로 받을 수 있음
    // socket.on('new_user', username)
    // console.log(socket.id);
    // console.log(username);
    // socket.emit('hello_user', 'hello ' + username);

    // username을 db에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}

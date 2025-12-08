import { Injectable } from '@nestjs/common';
import { Board } from 'src/boards/boards.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { type Board, BoardStatus } from 'src/boards/boards.model';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(request: CreateBoardDto) {
    const { title, description } = request;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id == id);

    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}

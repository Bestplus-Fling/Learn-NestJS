import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from 'src/boards/board.entity';
import { BoardRepository } from 'src/boards/board.repository';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(request: CreateBoardDto) {
  //   const { title, description } = request;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  async createBoard(request: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(request);
  }

  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id == id);
  //   if (!board) {
  //     throw new NotFoundException('존재하지 않는 게시글입니다.');
  //   }
  //   return board;
  // }
  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}

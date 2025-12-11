import { Injectable } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';
import { Board } from 'src/boards/board.entity';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard({ title, description }: CreateBoardDto): Promise<Board> {
    const board: Board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}

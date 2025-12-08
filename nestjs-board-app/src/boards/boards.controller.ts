import { Controller, Get } from '@nestjs/common';
import { Board } from 'src/boards/boards.model';
import { BoardsService } from 'src/boards/boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
}

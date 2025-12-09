import { Body, Controller, Get, Post } from '@nestjs/common';
import { type Board } from 'src/boards/boards.model';
import { BoardsService } from 'src/boards/boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') describtion: string,
  ): Board {
    return this.boardsService.createBoard(title, describtion);
  }
}

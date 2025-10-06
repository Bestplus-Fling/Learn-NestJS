import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter) // 모든 api에서 사용할 거라면 class 상단에 데코레이터를 추가
  getAllCat() {
    throw new HttpException('api dose not working', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param) {
    // ParseIntPipe를 사용했을 때, 숫자가 아닌 문자로 api를 요청했을 때 validation error 발생(유효성까지 검증 가능)
    // 원래 param id type은 string
    // pipes를 이용하여 number로 변환
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }
  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}

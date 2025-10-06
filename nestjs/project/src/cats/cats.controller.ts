import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // 모든 api에서 사용할 거라면 class 상단에 데코레이터를 추가
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    console.log('hello controller');
    return { cats: 'get all cat api' };
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

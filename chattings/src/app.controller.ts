import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // src/views/ 내부 파일명과 일치하게 작성
  root() {
    // return { message: 'Hello World!' };
    return {
      data: {
        title: 'Chattings',
        copyright: 'Park Min Woo',
      },
    };
  }
}

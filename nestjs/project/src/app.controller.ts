import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id/:name')
  // getHello(@Req() req: Request, @Body() body, @Param() param): string
  //   console.log(req);
  //   const body = req.body;
  //   console.log(body);
  //   console.log(param);
  //   return "hello world"
  // }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}

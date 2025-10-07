# NestJS 학습

#### 개행문자 오류 발생시

- `eslint.config.mjs`로 이동
- `rules`에 추가

```js
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
```

## CLI로 추가

- cli에서

```bash
# module 생성
nest g mo <app 명>

# controller 생성
nest g co <app 명>

# service 생성
nest g service <app 명>
```

## Pipe의 정의

> 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻을 수 있도록 도와주는 Class

## 환경변수

- 라이브러리 설치

```bash
  npm i --save @nestjs/config
```

- 이후 `process.env.{환경변수명}` 같이 사용 가능
- TS에서는 환경변수의 타입을 다음과 같이 정의함
  - `string | undefined`
- 따라서 확실히 환경변수가 있어야 해서 runtime에 에러가 발생되도 괜찮을 경우 `process.env.{환경변수명}!`와 같이 `!`를 추가하거나
- 혹은 환경변수가 없을 때 사용될 값을 지정해야 함(`process.env.{환경변수명} || {환경변수 대신 사용할 값}`)

## Schema 정의

- Validation 추가하기 위한 라이브러리 설치

```bash
  npm i --save class-validator class-transformer
```

## 비밀번호 암호화

- 필요한 라이브러리 설치

```bash
  npm i bcrypt
  npm i -D @types/bcrypt
```

- import

```ts
import * as bcrypt from 'bcrypt';
```

- 암호화에 사용

```ts
// 비밀번호 암호화
const hashedPassword = await bcrypt.hash(password, 10);
```

## API 성능을 개선해야 할 때

- Nest는 기본적으로 Express.js 프레임워크를 사용
- 하지만 Fastify와 같은 다른 라이브러리와의 호환성도 제공
- 따라서 성능이 중요한 API는 Fastify를 사용해 개선할 수 있음
  1. 많이 사용하는 Express로 개발
  2. 나중에 Fastify로 리팩토링

## Docs 추가(Swagger)

- install

```bash
  npm install --save @nestjs/swagger
```

- `main.ts`에 추가

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // ============ 추가된 부분 ============
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // ====================================
  await app.listen(process.env.PORT!);
}
bootstrap();
```

### endpoint에 설명이 필요할 때

- `src/cats/cats.controller.ts`

```ts
...
  // ApiOperation을 통해 docs Endpoint에 대한 설명 기입 가능
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
...
```

### Request Body Example Value 추가

- `src/cats/dto/cats.request.dto.ts`
  - `@ApiProperty`를 통해 예시를 추가할 수 있음

```ts
...
  @ApiProperty({
    example: 'test@example.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
...
```

### Response Description 추가

- `src/cats/cats.controller.ts`
  - `@ApiResponse`를 사용해 상태 코드와, 설명을 추가할 수 있음

```ts
...
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 201,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
...
```

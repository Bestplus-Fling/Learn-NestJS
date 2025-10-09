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

## Repository 패턴(Spring의 DAO와 유사)

- 왜 사용하는가?
  - 다양한 DB와 상호작용해야 하는 경우: Service Layer마다 지정이 필요
  - 재사용성이 낮음
- 사용한다면?
  - 중복되는 코드 감소
  - DB가 변경됐을 경우 간단하게 수정 가능
- 문제점
  - DB를 다른 서비스로 교체하는 일이 흔하지 않다

> NestJS는 기본적으로 Repository 패턴의 이점을 내장하고 있지만, 프로젝트 규모가 커지거나 도메인 중심 설계를 추구할수록 명시적인 Repository 계층을 두는 것이 유지보수성과 테스트 용이성 측면에서 유리하다.

> 단순 CRUD 위주의 소규모 프로젝트에서는 오히려 불필요한 추상화가 되어 오버엔지니어링이 될 수 있다.

## JWT(JSON Web Token)

[TODO: 읽고 내용 정리](https://hudi.blog/self-made-jwt/)

- Header, Payload, Signature로 분리
  - Header: base64 인코딩 토큰의 타입과 알고리즘
  - Payload: base64 인코딩 데이터(key-valeu)
  - Signature: Header/Payload를 조합, 비밀키로 서명, base64로 인코딩

- JWT 인증 구조

```text
[Client]
   │  (Bearer Token 포함)
   ▼
[Controller]
   │  @UseGuards(JwtAuthGuard)
   ▼
[JwtAuthGuard]
   │  extends AuthGuard('jwt')
   ▼
[JwtStrategy]
   │  PassportStrategy(Strategy)
   │  └─ verify JWT using secret key
   ▼
[AuthService]
   │  └─ 로그인 시 JWT 생성
   ▼
[JwtService]
   │  └─ sign(), verify()
   ▼
[Database / User Entity]
```

- install

```bash
# 공식문서에는 jwt만 install 후 guard까지 직접 구현
$ npm install --save @nestjs/jwt

# 강의에서는 이미 구현된 guard를 사용
$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
```

- 모듈/서비스 추가

```bash
$ nest g module auth
$ nest g service auth
```

> NestJS 공식문서의 JWT 예제는 단순한 토큰 검증 로직을 보여주기 위한 것이며, 실제 실무에서는 @nestjs/passport와 passport-jwt를 함께 사용하는 전략(Strategy) + 가드(Guard) 기반 구조가 표준적인 방식이다.

> 초기에는 복잡해 보이지만, 인증 체계를 확장하거나 유지보수할 때 훨씬 유연하다.

## Swagger API 보안 설정

- install

```bash
npm install express-basic-auth
```

## Multer를 이용한 미디어 서비스 처리

- install

```bash
npm i -D @types/multer
```

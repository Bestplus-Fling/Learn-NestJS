# NestJS 학습

#### Nest 명령어(Nest CLI) 안될 때

```bash
npm install -g @nestjs/cli
```

#### 개행문자 오류 발생시

- `eslint.config.mjs`로 이동
- `rules`에 추가

```js
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
```

#### Error Type 추론

- TypeScript 4.4부터 `catch`문의 `error` type이 any에서 unknown으로 변경됨
- 따라서 error 내부 인자가 있는지 없는지 사용자가 직접 확인해야 함

```ts
// src/common/utils/guards.ts
// error가 message: string 속성을 가진 객체인지 확인하는 타입 가드
interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  );
};
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

## 🚀 Mongoose Populate 문제 해결 구조화 요약

이 세션에서는 `Cat` 모델 조회 시 연관된 `Comments`가 함께 반환되지 않는 문제를 해결했습니다. 문제 해결 과정과 주요 내용은 다음과 같습니다.

### 1. 초기 문제 진단 및 정보 수집

*   **사용자 문제 제기:** `cat`과 관련된 `comments`를 조회해서 return 해야 하는데 `comments`가 같이 안 옴.
*   **모델 요청:** `cats.schema.ts`, `comments.schema.ts`, `cats.service.ts` 파일 내용 요청.
*   **초기 분석:** `cats.schema.ts`에 `comments` 가상 필드 정의 및 `cats.repository.ts`의 `findAll()` 메서드에서 `.populate()` 사용 확인. `comments.schema.ts`의 `info` 필드가 `ObjectId`로 `ref: 'cats'`를 참조하는 구조 확인.
*   **가설:** `populate` 설정은 올바르지만, 데이터베이스에 실제 댓글이 없거나 `info` 필드가 고양이 `_id`와 일치하지 않을 가능성 제기.

### 2. 데이터 및 Mongoose 동작 확인

*   **Mongoose 로그 확인:** `cats.find({}, {})` 및 `comments.find({ info: { '$in': [...] } }, {})` 로그를 통해 Mongoose가 `populate`를 시도하고 있음을 확인. 이는 `populate` 호출 자체는 작동하고 있음을 의미.
*   **API 응답 확인:** `GET /cats/all` 호출 결과 `comments: []`로 빈 배열이 반환됨을 확인.
*   **데이터베이스 댓글 확인:** 사용자가 제공한 MongoDB `comments` 컬렉션 문서 확인. `info` 필드가 고양이 `_id`와 일치하는 댓글이 실제로 존재함을 확인.
    *   예: `info: "68e7d1b69943dfcb8533ab95"` (Cat 1 ID)

### 3. 문제의 원인 파악 및 해결

*   **원인 1: `ref` 속성의 대소문자 불일치 (주요 해결책)**
    *   **발견:** `cats.schema.ts`의 `_CatSchema.virtual('comments', { ref: 'comments', ... })`에서 `ref` 값이 소문자 `'comments'`로 되어 있었음.
    *   **문제:** `comments.module.ts`에서 `MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }])`를 통해 모델이 `"Comments"` (대문자 'C')로 등록되었기 때문에, Mongoose는 소문자 `"comments"`라는 모델을 찾지 못함.
    *   **오류 메시지:** `MissingSchemaError: Schema hasn't been registered for model "comments".` 발생.
    *   **해결:** `src/cats/cats.schema.ts` 파일에서 `ref: 'comments'`를 `ref: 'Comments'`로 수정.
    *   **결과:** 이 수정 후 `GET /cats/all` 호출 시 `comments`가 올바르게 populate되어 반환됨.

*   **원인 2: `ObjectId` 타입 변환의 필요성 및 `Document` 상속 문제 (사용자 테스트를 통한 심화 이해)**
    *   **사용자 테스트:** `comments.service.ts`의 `createComment` 함수에서 `validatedAuthor.id`와 `targetCat.id` (문자열)를 `Types.ObjectId.createFromHexString()`으로 명시적으로 변환하지 않고 저장했을 때, `populate`가 작동하지 않음을 확인. 명시적 변환 시에만 작동.
    *   **추가 문제 발견:** 스키마 정의 시 `extends Document`를 누락하여 Mongoose가 `_id` 필드를 자동으로 추론하지 못하고, `id` 필드를 `string`으로 강제 선언하여 사용했었음. 이로 인해 `author` 및 `info` 필드에 `_id`가 아닌 `id` (string)가 전달되어 `ObjectId` 매칭에 문제가 발생.
    *   **해결:**
        1.  스키마 클래스에 `extends Document`를 추가하여 Mongoose가 `_id` 필드를 올바르게 관리하도록 함.
        2.  `comments.service.ts`에서 `author`와 `info` 필드에 `validatedAuthor._id`와 `targetCat._id`를 직접 전달하거나, `Types.ObjectId.createFromHexString()`을 사용하여 `ObjectId` 인스턴스로 변환하여 저장. (기존 `id` 대신 `_id` 사용)
    *   **결론:** `_id` 필드가 아닌 다른 필드에 `ObjectId`를 저장할 때는 `Types.ObjectId.createFromHexString()`과 같이 명시적으로 `ObjectId` 인스턴스로 변환하여 저장하는 것이 가장 견고하고 안전한 방법임을 확인. 또한, 스키마 클래스는 `Document`를 상속하여 Mongoose의 기본 `_id` 관리를 활용해야 함. 이는 `populate`가 `ObjectId` 값 간의 일치를 기반으로 작동하기 때문.

### 4. 모델 이름과 컬렉션 이름의 차이점 명확화

*   **사용자 질문:** `comments.schema.ts`에 `collection: 'comments'` 옵션을 명시했는데, 왜 `ref`에는 클래스 이름인 'Comments'를 사용해야 하는가?
*   **설명:**
    *   **모델 이름:** Mongoose가 내부적으로 스키마 정의를 식별하는 이름. `MongooseModule.forFeature`에 등록된 `name` 속성(기본적으로 클래스 이름)을 따름. (예: `"Comments"`)
    *   **컬렉션 이름:** MongoDB 데이터베이스에 실제 문서가 저장되는 컬렉션의 이름. 스키마 옵션의 `collection` 속성으로 명시적으로 설정 가능. (예: `"comments"`)
    *   `ref` 속성은 항상 **Mongoose 모델 이름**을 참조해야 하므로, `"Comments"`를 사용해야 함. `collection` 옵션은 데이터베이스의 물리적 컬렉션 이름에만 영향을 미침.

---

**최종 결론:** Mongoose의 `populate` 기능은 **참조하는 모델의 정확한 이름(대소문자 구분)**과 **외래키 필드의 데이터 타입(실제 `ObjectId` 인스턴스)**에 매우 엄격하다. 특히 스키마 클래스가 `Document`를 상속하여 `_id` 필드를 올바르게 관리하고, `ObjectId` 참조 필드에 명시적으로 `ObjectId` 인스턴스를 전달해야 1:N 관계 조회가 성공적으로 이루어진다.
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

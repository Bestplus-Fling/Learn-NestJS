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

> 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원ㄴ하는 데이터를 얻을 수 있도록 도와주는 Class

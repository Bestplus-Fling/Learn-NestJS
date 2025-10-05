import * as express from "express";
import catsRouter from "./cats/cats.route";

/*
  미들웨어가 필요한 이유: 
    - Router에 도달하기 전, 모든 엔드포인트에서 실행해야 하는 로직을 수행하기 위해서...?
*/

const app: express.Express = express(); // or express.Application
const port: number = 8000;

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("This is middleware");
  next();
});

//* json middleware
app.use(express.json());

app.use(catsRouter);

//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

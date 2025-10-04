import * as express from "express";
import { Cat, CatType } from "./app.model";
import { clearScreenDown } from "readline";
import exp from "constants";
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

//* Read: 고양이 전체 데이터 조회
app.get("/cats", (req: express.Request, res: express.Response) => {
  try {
    // 현재는 모킹으로, 나중에 db에 연결하는 걸 전제로 진행
    const cats = Cat;
    // throw new Error("db connect error"); // 만약 에러가 발생한다면 catch문으로 이동
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error?.message,
    });
  }
});

//* Read: 특정 고양이 데이터 조회
app.get("/cats/:id", (req: express.Request, res: express.Response) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error?.message,
    });
  }
});

//* Create: 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    Cat.push(data); // create
    res.status(201).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error?.message,
    });
  }
});

//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

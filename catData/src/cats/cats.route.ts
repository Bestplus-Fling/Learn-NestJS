//* Read: 고양이 전체 데이터 조회
import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import * as express from "express";

const router = Router();

router.get("/cats", (req: express.Request, res: express.Response) => {
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
router.get("/cats/:id", (req: express.Request, res: express.Response) => {
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
router.post("/cats", (req, res) => {
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

export default router;

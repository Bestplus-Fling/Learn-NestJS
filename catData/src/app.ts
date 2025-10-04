import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express(); // or express.Application
const port: number = 8000;

const data: number[] = [1, 2, 3, 4];

app.get("/", (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

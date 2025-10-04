import * as express from "express";

const app: express.Express = express(); // or express.Application
const port: number = 8000;

app.get("/test", (req: express.Request, res: express.Response) => {
  // console.log(req);
  // res.send("Hello World!");
  res.send({ hello: "world!!!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

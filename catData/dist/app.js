"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats/cats.route");
var app = express();
var port = 8000;
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("This is middleware");
    next();
});
app.use(express.json());
app.use(cats_route_1.default);
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map
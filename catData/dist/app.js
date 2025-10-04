"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("This is middleware");
    next();
});
app.use(express.json());
app.get("/cats", function (req, res) {
    try {
        var cats = app_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
app.get("/cats/:id", function (req, res) {
    try {
        var params_1 = req.params;
        console.log(params_1);
        var cat = app_model_1.Cat.find(function (cat) {
            return cat.id === params_1.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat: cat,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
app.post("/cats", function (req, res) {
    try {
        var data = req.body;
        app_model_1.Cat.push(data);
        res.status(201).send({
            success: true,
            data: data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map
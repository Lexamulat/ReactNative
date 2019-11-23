var express = require('express');
var app = express();
const bodyParser = require('body-parser');
// var db = require("./database.js")

var indexRouter = require('./routes/index');
// var updateRouter = require('./routes/update');
// var readRouter = require('./routes/read');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('process.env.API_URL', process.env.API_URL);
    console.log('Listening on port 3000');
});
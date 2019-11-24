var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log('have request')
  const response=[
    {a:1},
    {a:2}
  ]
  res.send(response);

});

module.exports = router;

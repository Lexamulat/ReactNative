var express = require('express');
var router = express.Router();
const db = require("../database.js")
const { databaseName } = require("../server.config.js");

/* GET home page. */
router.get('/', function (req, res, next) {


  console.log('req', req.query);
  // const nameReg = req.query.name
  const nameReg = 'р';


  // console.log('have request')
  const response = [
    {
      id: 1,
      a: 1
    },
    {
      id: 2,
      a: 2
    }
  ]


  const sql = `SELECT * FROM ${databaseName} WHERE name LIKE '%${nameReg}%'`
  // const sql = `SELECT * FROM ${databaseName}`

  console.log('sql', sql)

  db.all(sql, (err, rows) => {
    if (err) {
      console.error('err.message', err.message)
      return;
    }
    console.log('rows', rows)

    res.send(rows);

  });

});

module.exports = router;


var conn = require('./../inc/db')
var express = require('express');
var assert = require('assert')

var router = express.Router();

//CREATE A JSON CLIENT

/* GET users listing. */
router.get('/', function (req, res, next) {

  conn.query("SELECT * FROM tb_users ORDER BY name", (err, results)=>{

    if (err) {
      res.send(err)
    }else{

      res.send(results)

    }

  })

  })



module.exports = router;


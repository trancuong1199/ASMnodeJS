var express = require('express');
const app = express();
var router = express.Router();
const db = require('../models/database')

router.get('/product/:id', function(req, res, next) {
    let id = req.params.id; 
    let products = `select * from products WHERE id=${id}`; 
    db.query(products, function(err, results) {
        if (err) throw err;
        res.json(results[0]);
    })
  });

  

router.get('/producthot', function(req, res, next) {
  let products = `select * from products ORDER by hot desc limit 4`; 
  db.query(products, function(err, results) {
    if (err) throw err;
    res.json(results)
  })
});

router.get('/productviews', function(req, res, next) {
  let products = `select * from products ORDER by view desc limit 5`; 
  db.query(products, function(err, results) {
    if (err) throw err;
    res.json(results)
  })
});

module.exports = router;

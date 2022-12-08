var express = require('express');
const app = express();
var router = express.Router();
const db = require('../models/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  let sql = "select id, name from categories";
  let products = "select * from products limit 2";
  db.query(sql +";"+products, function(err, results) {
    if (err) throw err;
    res.render('home', { cateClothes: results[0], products: results[1] });
  })

  if (req.session.daDangNhap) {
    db.query(sql +";"+products, function(err, results) {
      if (err) throw err;
      res.render('home', { cateClothes: results[0], products: results[1] } ,{un:req.session.username});
    })
  }
  else {       
    res.redirect("/dangky");
  }
});

router.get("/listProduct/:cateId",(req,res)=>{
  let id = req.params.cateId; 
  let sql = `select * from categories`; 
  let products = `select * from products WHERE idCat=${id}`; 
  db.query(sql +";"+products, function(err, results) {
    if (err) throw err;
    res.render('listProduct', { cateClothes: results[0], products: results[1] });
  })
})


router.get('/product/:id', function(req, res, next) {
  let id = req.params.id; 
  let sql = `select * from categories`; 
  let products = `select * from products WHERE id=${id}`; 
  let view = `update products set view=view+1 where id=${id}`

  db.query(sql +";"+products + ';' + view, function(err, results) {
    if (err) throw err;
    res.render('product', { cateClothes: results[0], products: results[1] });
  })

});

router.get('/brand', function(req, res, next) {
  res.render('brand', { title: 'Express' });
});

router.get('/camon', function(req, res, next) {
  res.render('camon', { title: 'Express' });
});

router.get('/local', function(req, res, next) {
  res.render('local', { title: 'Express' });
});

router.get('/signUp', function(req, res, next) {
  res.render('sing-up', { title: 'Express' });
});

router.get('/listProduct/:cateId', function(req, res, next) {
  let sql = "select id, name from categories";
  let products = "select * from products";
  db.query(sql +";"+products, function(err, results) {
    if (err) throw err;
    res.render('listProduct', { cateClothes: results[0], products: results[1] });
  })
});

router.get('/productView', function(req, res, next) {
  let sql = "select id, name from categories";
  let products = "select * from products";
  db.query(sql +";"+products, function(err, results) {
    if (err) throw err;
    res.render('productView', { cateClothes: results[0], products: results[1] });
  })
});

router.get('/productHot', function(req, res, next) {
  let sql = "select id, name from categories";
  let products = "select * from products";
  db.query(sql +";"+products, function(err, results) {
    if (err) throw err;
    res.render('productHot', { cateClothes: results[0], products: results[1] });
  })
});

router.get('/dangky', function(req, res) {
  res.render("sing-up.ejs");
});

router.post('/luu', function(req, res) {
  let u = req.body.username;
  let p = req.body.password;
  let em = req.body.email;  

  const bcrypt = require("bcrypt");        
  var salt = bcrypt.genSaltSync(10);
  var pass_mahoa = bcrypt.hashSync(p, salt);

  let user_info ={username: u, password:pass_mahoa, email:em};  
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user_info);
  res.redirect("/camon");
})

router.post('/dangnhap_', async function(req, res) {
  let u = req.body.username;
  let p = req.body.password;
  let sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [u] , (err, rows) => {   
      if (rows.length<=0) { 
          res.redirect("/dangky"); 
          return;
      }
      let user = rows[0];        
      let pass_fromdb = user.password;        
      const bcrypt = require("bcrypt");        
      var kq = bcrypt.compareSync(p, pass_fromdb);
      if (kq){ 
          console.log("OK");   
          var sess = req.session;  //initialize session variable
          sess.daDangNhap = true;
          sess.username = user.username;                         
          res.redirect("/");
      }   
      else {
          console.log("Not OK");
          res.redirect("/dangky");
      }
  });   
});

module.exports = router;

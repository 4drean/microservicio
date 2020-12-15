var express = require('express');
const {route, use}=require('.');
var router = express.Router();
const User = require('../model/user');
const Sug =require('../model/form');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Sug',function  (req,res, next ){
  console.log(req.body);
  let sug =new Sug({
    correo: req.body.correo,
    sexo: req.body.sexo,
    sugerencia: req.body.sugerencia
  });
 
 
  //Guarda un registro en Mongo
  sug.save((err, response) => {
      if (err) res.status(400).send(err);
      res.status(200).send(response);
      
  });
  res.redirect('/');
});

/*  LOGIN */

router.post("/login", function(req, res, next) {
  console.log(req.body);
  let user=new User({
    email: req.body.email,
      password: req.body.password
  });
 
 
  //Guarda un registro en Mongo
  user.save((err, response) => {
      if (err) res.status(400).send(err);
      res.status(200).send(response);
  });

  //Busca un registro mediante el email
  /*
  User.findById(req.body.email, (err, user) => {
      if (err) res.status(400).send(err);
      res.status(200).send(user);
  });
  */
});


module.exports = router;

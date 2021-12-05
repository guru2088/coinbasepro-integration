'use strict';

var util = require('util');

var bcrypt = require('bcrypt');

var BCRYPT_SALT_ROUNDS = 12;

var Save = require('../helpers/db').Save;
var FindOne = require('../helpers/db').FindOne;



module.exports = {
  signup:signup,
  login:login
};

function signup(req, res){
   bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then(function(hashedPassword) {
     var obj = {
       email : req.body.email,
       password : hashedPassword
     }
      Save("user", obj).then(function(response) {
         res.json(response)
      });
   })

   .catch(function(error){
       console.log("Error saving user: ");
       console.log(error);
       res.error(error)
   });
}



function login(req, res){

  var obj = {
    email : req.body.email
  }

  FindOne("user", obj).then(async function(response) {
   var result = await bcrypt.compare(req.body.password, response.password )
    if(result){
        res.json({userID: response._id, email: req.body.email, status: true})
    }
    else{
      res.json({status: false})

    }
  });

}

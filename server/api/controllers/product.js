'use strict';

var util = require('util');
const ObjectID = require('mongodb').ObjectID;

var Save = require('../helpers/db').Save;
var FindOneUpdate = require('../helpers/db').FindOneUpdate;
var FindAll = require('../helpers/db').FindAll;


module.exports = {
  subscribe:subscribe,
  getSubscription: getSubscription
};

function subscribe(req, res){
  var obj = {
    productID : req.body.productID,
    userID : req.body.userID
  }
   FindOneUpdate("subscription", obj).then(function(response) {
      res.json(response)
   });
}

function getSubscription(req, res){
  var obj = {
    "obj.userID" :  req.body.userID
  }

   FindAll("subscription", obj).then(function(response) {
      res.json(response)
   });
}

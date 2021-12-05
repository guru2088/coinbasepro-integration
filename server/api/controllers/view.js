'use strict';

var util = require('util');

var FindAllSortLimit = require('../helpers/db').FindAllSortLimit;



module.exports = {
  priceView:priceView,
  matchView: matchView
};


function priceView(req, res){

  var obj = {
    "type" : "heartbeat",
    "product_id" : {"$in": req.body.productID}
  }
  FindAllSortLimit("values", obj,{"_id": -1},50).then( function(response) {
    res.json(response)
  });

}



function matchView(req, res){

  var obj = {
    "type" : "match",
    "product_id" : {"$in": req.body.productID}
  }

  FindAllSortLimit("values", obj,{"_id": -1},50).then( function(response) {
    res.json(response)
  });

}

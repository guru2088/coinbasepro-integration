var MongoClient = require('mongodb').MongoClient;


const config = require('../config/config');

const url = generateMongoConnectionString(config.db)



function generateMongoConnectionString(dbConfig) {
  let connStr = "mongodb://";
  if(dbConfig.user && dbConfig.pwd) {
      connStr += `${dbConfig.user}:${dbConfig.pwd}@`
  }

  connStr += `${dbConfig.host}:${dbConfig.port}/`

  if(dbConfig.database) {
      connStr += `${dbConfig.database}`
  }

  return connStr;
}


function Save(collection,obj) {

  var dbo = null;
  console.log(`Connecting to Mongodb URL: ${url}`);

  return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          dbo = db.db(config.db.database);
          dbo.collection(collection).insertOne(obj, function(err, result) {
              if (err) reject(err);
              console.log(result)
              resolve(result);
          });
      });
    });

}




function FindOne(collection,obj) {

  var dbo = null;
  console.log(`Connecting to Mongodb URL: ${url}`);

  return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          dbo = db.db(config.db.database);
          dbo.collection(collection).findOne(obj, function(err, result) {
            if (err) reject(err);
            console.log(result)
            resolve(result);
          });
      });
    });

}



function FindOneUpdate(collection,obj) {

  var dbo = null;
  console.log(`Connecting to Mongodb URL: ${url}`);

  return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          dbo = db.db(config.db.database);
          dbo.collection(collection).findOneAndUpdate({ obj }, { $set: {createdAt: new Date()} }, { upsert: true }, (err, result) => {
            if (err) reject(err);
            console.log(result)
            resolve(result);
          })
      });
    });

}


function FindAll(collection,obj) {

  var dbo = null;
  return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          dbo = db.db(config.db.database);
          dbo.collection(collection).find(obj).toArray(function(err, result) {
            if (err) reject(err);
            console.log(result)
            resolve(result);
         });


      });
    });

}



function FindAllSortLimit(collection,obj,sort,limit) {

  var dbo = null;
  return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          dbo = db.db(config.db.database);
          dbo.collection(collection).find(obj).sort(sort).limit(limit).toArray(function(err, result) {
            if (err) reject(err);
            console.log(result)
            resolve(result);
         });


      });
    });

}

module.exports = {
  Save: Save,
  FindOne: FindOne,
  FindOneUpdate: FindOneUpdate,
  FindAll: FindAll,
  FindAllSortLimit:FindAllSortLimit
};

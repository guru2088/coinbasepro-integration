const axios = require('axios');


export async function Signup(email,password) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const json = JSON.stringify({"email" : email,"password": password });
        const res = await axios.post('http://localhost:10010/signup', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}



export async function LoginUser(email,password) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const json = JSON.stringify({"email" : email,"password": password });
        const res = await axios.post('http://localhost:10010/login', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}



export async function Subscribe(productID,userID) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const json = JSON.stringify({"productID" : productID, "userID": userID });
        const res = await axios.post('http://localhost:10010/product', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}



export async function GetSubscriptions(userID) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const json = JSON.stringify({ "userID" : userID });
        const res = await axios.post('http://localhost:10010/subscription', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}



export async function GetPrices(productID) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const res = await axios.post('http://localhost:10010/priceView', { "productID": productID});
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}


export async function GetMatches(productID) {
    var promise=new Promise(async function(resolve, reject) {
      try {
        const res = await axios.post('http://localhost:10010/matchView', { "productID": productID});
        resolve({value: res, status: "success"})
      } catch (e) {
        reject({error: e, status: "error"});
      }
  });
  return promise;
}

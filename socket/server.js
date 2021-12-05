const CoinbasePro = require('coinbase-pro');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


var coinbaseWs = '';


function connect(products) {
    coinbaseWs = new CoinbasePro.WebsocketClient(
        products,
        'wss://ws-feed.pro.coinbase.com',
        {
            key: process.env.KEY,
            secret: process.env.SECRET,
            passphrase: process.env.PASSPHRASE,
        },
        { channels: ['prices','matches'] }
    );

    coinbaseWs.on('message', async data => {

        MongoClient.connect(process.env.DB_URL, function(err, db) {
            if (err) throw err;
            dbo = db.db(process.env.DB_NAME);
            dbo.collection(process.env.COLL_NAME).insertOne(data, function(err, result) {
                if (err) reject(err);
                console.log(result)
                db.close()
            });
        });

    });

    coinbaseWs.on('error', err => {
      console.error("Connection with Coinbase websocket failed with error: " + err);
      console.log("Error stack trace: " + err.stack);
    });

    coinbaseWs.on('close', () => {
      console.error("Connection with Coinbase websocket closed!");
    });
}

connect(['BTC-USD' , 'ETH-USD', 'XRP-USD', 'LTC-USD']);

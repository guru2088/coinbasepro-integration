const dotenv = require("dotenv");
dotenv.config();

const config = {
    environment: process.env.NODE_ENV || 'production',
    db: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '27017',
        database: 'test'
    },
};

module.exports = config;

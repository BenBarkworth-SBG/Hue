// imports MongoClient from the MongoDB module
const { MongoClient } = require('mongodb');

// environment variables for the MongoDB connection
const {
    MONGO_HOST,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DBNAME,
    MONGO_LOCAL,
} = process.env;

// The MongoDB connection using the env variables
let MONGO_URI = 'mongodb+srv://'+MONGO_USERNAME+':'+MONGO_PASSWORD+'@'+MONGO_HOST+'/'+MONGO_DBNAME+'?authSource=admin';

if (MONGO_LOCAL === 'true') {
  MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}
// a MongoClient instance
const client = new MongoClient(MONGO_URI);
// database retrieval
const db = client.db();

// export variables
module.exports = {
    client,
    db,
  };
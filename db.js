// imports MongoClient from the MongoDB module
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

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

const conn = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// function to close connection to mongodb
async function closeConnection() {
  await client.close();
  console.log('Closed MongoDB connection');
}
//closeConnection()

// export variables
module.exports = {
    client,
    db,
    conn,
  };
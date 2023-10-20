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


// function to connect to database
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connectToMongo();

// let user1 = {
//   name: "Matt",
//   email: "blabla@bla.com",
//   password: "password",
// };

// let user2 = {
//   name: "Ben",
//   email: "bla1bla@bla1.com",
//   password: "password",
// };

// let user3 = {
//   name: "Josh",
//   email: "bla2bla@bla2.com",
//   password: "password",

// }

// function to add user into database
async function insertUser(data) {
  const collection = client.db().collection('Users');

  try {
    const result = await collection.insertOne(data);
    console.log(`Inserted a document with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting document', err);
  }
}

// insertUser(user1);
// insertUser(user2);
//insertUser(user3)

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
  };
const { db } = require('../db');
const collection = db.collection('Colours');
const user = require('../Models/user')

// Define the controller function
async function getAllData() {
  try {
    // Query the collection to retrieve all documents
    const colours = await collection.find().toArray();
    return colours;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return({ error: 'Failed to retrieve data' });
  }

}// Export the controller function


async function insertPalette(data) {
  const paletteCollection = db.collection('Palettes');
  try {
    const result = await paletteCollection.insertOne(data);
    console.log(`Inserted a document with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting document', err);
  }
}

module.exports = {
  getAllData,
  insertPalette
};

//creates new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new user(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

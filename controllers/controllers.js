const { db } = require('../db');
const collection = db.collection('Colours');

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
module.exports = {
  getAllData
};
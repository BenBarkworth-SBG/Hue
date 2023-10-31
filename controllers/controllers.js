const { ObjectId } = require('mongodb');
const { db } = require('../db');
const coloursCollection = db.collection('Colours');
const usersCollection = db.collection('Users');
const userInfo = require('../models/user');
//const user = require('../Models/user')

// Function to get all colours data from DB
async function getAllColoursData() {
  try {
    const colours = await coloursCollection.find().toArray();
    console.log(colours);
    return colours;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return({ error: 'Failed to retrieve data' });
  }
}

//Function to get all user data
async function getAllUserData() {
  try {
    const users = await usersCollection.find().toArray();
    console.log(users);
    return users;
  } catch (error) {
    console.error('error retrieving data', error);
    return({error: 'failed to retrieve data'});
  }
}

// function to getuserbyid - needs editing slighlty
async function getUserById(id) {
  try {
    const user = await usersCollection.findOne({_id: id});
    console.log("matt")
    return user;
  } catch (error) {
    console.error("error retrieving user", error);
    return {error: "failed to retrieve user"};
  }
}
getUserById()

// Function to insert a palette into DB
async function insertPalette(data) {
  const paletteCollection = db.collection('Palettes');
  try {
    const result = await paletteCollection.insertOne(data);
    console.log(`Inserted a document with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting document', err);
  }
}

// function to add user into database
async function insertUser(data) {
  const usersCollection = db.collection('Users');
  try {
    const result = await usersCollection.insertOne(data);
    console.log(`Inserted a document with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting document', err);
  }
}

// function to update users - needs checking with a function call
async function updateUser(id, data) {
  try {
    const updatedUser = await usersCollection.findOneAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.error("error updating data", error);
    return {error: "failed to update data"}
  }
}

// Export all functions below
module.exports = {
  getAllColoursData,
  insertPalette,
  insertUser,
  getAllUserData,
  updateUser,
  getUserById
};

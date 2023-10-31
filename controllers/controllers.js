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

// function to getuserbyid
async function getUserById(id) {
  try {
    const user = await userInfo.findById(id);
    console.log(user)
    return user;
  } catch (error) {
    console.error("error retrieving user", error);
    return {error: "failed to retrieve user"};
  }
}

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

// function to create user into database
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
    const updatedUser = await userInfo.findByIdAndUpdate(id, data, {
      new: true,
    });
    console.log("updated user")
    return updatedUser;
  } catch (error) {
    console.error("error updating data", error);
    return {error: "failed to update data"}
  }
}

// function to delete a user
async function deleteUser(id) {
  try {
    const deletedUser = await userInfo.findByIdAndDelete(id);
    console.log("deleted user", deletedUser)
    return deletedUser
  } catch (error) {
    console.error("Error deleting data:", error);
    return { error: "Failed to delete data" };
  }
}

// Export all functions below
module.exports = {
  getAllColoursData,
  insertPalette,
  insertUser,
  getAllUserData,
  updateUser,
  getUserById,
  deleteUser
};

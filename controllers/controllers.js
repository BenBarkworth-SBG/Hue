const { db } = require('../db');
const coloursCollection = db.collection('Colours');
const usersCollection = db.collection('Users');
const userInfo = require('../models/user');
const palette = require('../models/palette');

// get all colours data from DB
async function getAllColoursData() {
  try {
    const colours = await coloursCollection.find().toArray();
    return colours;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return({ error: 'Failed to retrieve data' });
  }
}

// get all user data
async function getAllUserData() {
  try {
    const users = await usersCollection.find().toArray();
    return users;
  } catch (error) {
    console.error('error retrieving data', error);
    return({error: 'failed to retrieve data'});
  }
}

// get user from objectId
async function getUserById(id) {
  try {
    const user = await userInfo.findById(id);
    return user;
  } catch (error) {
    console.error("error retrieving user", error);
    return {error: "failed to retrieve user"};
  }
}

// insert palette into DB
async function insertPalette(data) {
  try {
    const paletteDocument = await palette.create(data);
    return paletteDocument;
  } 
  catch (error) {
    console.error('Error inserting document', error);
    return { error: "Failed to insert palette" };
  }
}

// get all palettes
async function getAllPalettesData() {
  try {
    const allPalettes = await palette.find();
    return allPalettes
  } catch (error) {
    console.error('Error retrieving data:', error);
    return({ error: 'Failed to retrieve data' });
  }
}

// get palette by paletteId
async function getPaletteById(paletteId) {
  try {
    const getPalette = await palette.findById(paletteId);
    return getPalette
  } catch (error) {
    console.error('Error retrieving data:', error);
    return({ error: 'Failed to retrieve data' });
  }
}

// get user favourites by username
async function getUserFavourites(user) {
  try {
    const userFavourites = await userInfo.findOne(user);
    const favoritePalettes = userFavourites.favourites;

    const palettes = [];
    const names = []

    for (const favorite of favoritePalettes) {
      const getFavouritePalette = await getPaletteById(favorite.paletteId);
      names.push(favorite.paletteName)
      palettes.push(getFavouritePalette);
    }

    return {palettes,names};
  } catch (error) {
    console.error('Error retrieving data:', error);
    return { error: 'Failed to retrieve data' };
  }
}


// create a user
async function insertUser(data) {
  try {
    const userDocument = await userInfo.create(data);
    console.log(`Inserted a document with ID: ${userDocument._id}`);
    return userDocument._id
  } catch (err) {
    console.error('Error inserting document', err);
  }
}

// update a user
async function updateUser(id, data) {
  let updatedUser = null;
  try {
    updatedUser = await userInfo.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return updatedUser;
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessage = error.errors['favourites.paletteName'].message;
      // if updatedUser is null, create an object to store the error
      updatedUser = updatedUser || {};
      updatedUser.error = errorMessage
    } else {
      updatedUser = updatedUser || {};
      updatedUser.error = "Error updating user data";
    }
    return updatedUser;
  }
}

// delete a user
async function deleteUser(id) {
  try {
    const deletedUser = await userInfo.findByIdAndDelete(id);
    return deletedUser
  } catch (error) {
    console.error("Error deleting data:", error);
    return { error: "Failed to delete data" };
  }
}

// get user by username
async function getUserByUsername(user) {
  try {
    const getUser = await userInfo.findOne(user);
    return getUser
  } catch (error) {
    console.error("error finding user", error);
    return {error: "failed to retrieve user"};
  }
}

// delete palette from favourites
async function deletePaletteFromFavorites(userId, paletteIdToDelete) {
  try {
    const user = await userInfo.findById(userId);

    if (!user) {
      console.error("User not found");
      return { error: "User not found" };
    }

    user.favourites = user.favourites.filter(
      (palette) => palette.paletteId.toString() !== paletteIdToDelete
    );

    await user.save();

    console.log("Palette deleted from favorites");
    return { success: "Palette deleted from favorites" };
  } catch (error) {
    console.error("Error deleting palette from favorites:", error);
    return { error: "Failed to delete palette from favorites" };
  }
}

module.exports = {
  getAllColoursData,
  insertPalette,
  getAllPalettesData,
  insertUser,
  getAllUserData,
  updateUser,
  getUserById,
  deleteUser,
  getUserByUsername,
  getUserFavourites,
  deletePaletteFromFavorites,
};

const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to the database`);
  } catch (error) {
    console.log(`Error in connecting to the database`.red);
  }
};

module.exports = connectDB;

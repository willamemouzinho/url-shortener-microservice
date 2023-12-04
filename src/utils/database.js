require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.DATABASE_URL;

databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set("strictQuery", false);
    global.mongoose = await mongoose.connect(URI);
  }
};

module.exports = databaseConnection;

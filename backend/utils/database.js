const mongoose = require("mongoose");


function dbConnect() {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Database server connected");
      })
      .catch((error) =>
        console.log("Error while connecting to database server", error)
      );
  }

  module.exports = dbConnect;
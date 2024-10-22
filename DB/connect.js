const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "Slack",
  });
};

module.exports = connectDB;

const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/todoaap")
    .then(() => {
      console.log("Status 200 from Database");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;

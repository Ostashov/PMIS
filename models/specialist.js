const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Specialist", schema);

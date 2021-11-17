const { Schema, model } = require("mongoose");

const tuitahSchema = new Schema({
  text: {
    type: String,
    maxLength: 200,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tuitah = model("Tuit", tuitahSchema, "tuits");

module.exports = Tuitah;

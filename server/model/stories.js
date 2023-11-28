const mongoose = require("mongoose");
const User = require("./user");

const stories = new mongoose.Schema({
  bookmark: {
    type: Boolean,
    default: false,
  },

  // userId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true,
  // },

  userId: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }],

  slides: [
    {
      heading: {
        type: String,
        required: [true, "please provide your heading"],
        maxlength: [20, "heading should be of 40 characters"],
      },
      description: {
        type: String,
        required: [true],
      },
      image: {
        url: String,
      },
      like: {
        type: Number,
        default: 0,
      },
      category: {
        type: String,
        required: true,
        set: (v) => v.trim(),
      },
    },
  ],
});

module.exports = mongoose.model("Stories", stories);

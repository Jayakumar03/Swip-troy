const mongoose = require("mongoose");
const User = require("./user");

const stories = new mongoose.Schema({
  bookmark: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

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
    },
  ],
});

module.exports = mongoose.model("Stories", stories);

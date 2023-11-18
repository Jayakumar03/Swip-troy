const express = require("express");
const router = express.Router();

const {
  getAllStories,
  bookmarkedStories,
  filteredStories,
} = require("../controllers/storiesController.js");

router.route("/getallstories").get(getAllStories);
router.route("/bookmarkedStories").get(bookmarkedStories);
router.route("/filteredstories").get(filteredStories);

module.exports = router;

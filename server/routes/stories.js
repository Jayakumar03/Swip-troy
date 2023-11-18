const express = require("express");
const router = express.Router();

const {
  getAllStories,
  bookmarkedStories,
  filteredStories,
  getIndividualStories
} = require("../controllers/storiesController.js");

router.route("/getallstories").get(getAllStories);
router.route("/bookmarkedStories").get(bookmarkedStories);
router.route("/filteredstories").get(filteredStories);
router.route("/:id").get(getIndividualStories);


module.exports = router;

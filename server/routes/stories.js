const express = require("express");
const router = express.Router();

const {
  getAllStories,
  bookmarkedStories,
  filteredStories,
  getIndividualStories,
  createStories,
  editStories
} = require("../controllers/storiesController.js");

router.route("/getallstories").get(getAllStories);
router.route("/bookmarkedStories").get(bookmarkedStories);
router.route("/filteredstories").get(filteredStories);
router.route("/:id").get(getIndividualStories);
router.route("/createstories").post(createStories);
router.route("editstories").put(editStories);



module.exports = router;

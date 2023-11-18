const Stories = require("../model/stories");

exports.getAllStories = async (req, res, next) => {
  try {
    const allStories = await Stories.find({});
    console.log(allStories);

    if (!allStories.length) {
      res.status(400).json({
        success: false,
        message: "There are no stories avaiable",
      });
    }

    res.status(200).json({
      success: true,
      stories: allStories,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.bookmarkedStories = async (req, res, next) => {
  try {
    const bookmarkedStories = await Stories.find({ bookmark: true });

    if (!bookmarkedStories.length) {
      res.status(400).json({
        success: false,
        message: "There are no bookmarked stories avaiable",
      });
    }

    res.status(200).json({
      success: true,
      bookmarkedStories: bookmarkedStories,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.filteredStories = async (req, res, next) => {
  try {
    const { filters } = req.body;

    const filteredStories = await Stories.find({ category: { $in: filters } });

    if (!filteredStories.length) {
      res.status(400).json({
        success: false,
        message: "There are no stories avaiable for the filters",
      });
    }

    res.status(200).json({
      success: true,
      filteredStories: filteredStories,
    });
  } catch (error) {
    console.error(error);
  }
};

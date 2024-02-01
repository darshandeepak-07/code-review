const User = require("../../models/user/user");
const CodeReview = require("../../models/codereview/codereview");
const { calculateLines } = require("../../middlewares/statisticsMiddle");

//user stats
const getStats = async (request, response) => {
  try {
    const userData = await CodeReview.find({
      createdBy: request.params.id,
    })
      .select(["code", "repositoryURL", "reviewId", "createdAt"])
      .populate({ path: "createdBy", select: "totalRevision" });

    let userStat = userData.map((data) => {
      data.code = calculateLines(data.code);
      return data;
    });
    response.send(userStat);
  } catch (error) {
    console.log(error);
    response.status(404).send("user not found");
  }
};

module.exports = {
  getStats,
};

const User = require("../../models/user/user");
const CodeReview = require("../../models/codereview/codereview");
const { calculateLines } = require("../../middlewares/statisticsMiddle");

//user stats
const getStats = async (request, response) => {
  try {

    User.findOne({userId:request.params.userId})
    .then((user)=>{
     
      CodeReview.find({createdBy:user._id}).select(["code", "repositoryURL", "reviewId", "createdAt"])
      .populate({ path: "createdBy", select: "totalRevision" })
        .then((userData)=>{
          let userStat = userData.map((data) => {
            data.code = calculateLines(data.code);
            return data;
          });
          response.send(userStat);
        })
        .catch(err=>response.status(404).send("user not found inner catch "+err))
    })
    .catch(err=>response.status(404).send("user not found outer catch"+err));
  } catch (error) {
    console.log(error);
    response.status(404).send("user not found");
  }
};

module.exports = {
  getStats,
};

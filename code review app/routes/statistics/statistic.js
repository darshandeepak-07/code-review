const router = require("express").Router();
const { getStats } = require("../../controller/statistic/statisticController");
router.get("/user-stats/:id", getStats);

module.exports = router;

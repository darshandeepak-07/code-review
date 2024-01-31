const router = require("express").Router();
const { getUsers } = require("../../controller/admin/adminControl");
router.get("/user", getUsers);

module.exports = router;

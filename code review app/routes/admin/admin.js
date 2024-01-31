const router = require("express").Router();
const {
  getUsers,
  editUser,
  deleteUser,
} = require("../../controller/admin/adminControl");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/user", getUsers);
router.put("/user/:id/edit", editUser);
router.delete("/user/:id/delete", deleteUser);
module.exports = router;

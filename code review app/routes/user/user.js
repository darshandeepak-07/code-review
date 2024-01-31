const express = require('express');
const router = express.Router();
const {findUser,editUser,pwdEdit} = require('../../controller/user/user');
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/:userId',findUser);
router.put('/:userId/edit',editUser)
router.put('/:userId/edit/password',pwdEdit)
module.exports = router;
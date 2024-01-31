const express = require('express')
const CodeReview = require('../../controller/codereview/codereview')
const router = express.Router();

router.post('/:userId/create',CodeReview.createReview);

module.exports = router;
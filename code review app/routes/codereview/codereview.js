const express = require("express");
const CodeReview = require("../../controller/codereview/codereview");
const router = express.Router();

router.post('/:userId/create',CodeReview.createReview);
router.get('/:reviewId',CodeReview.getReview);
router.put('/:reviewId/edit',CodeReview.editReview);
router.delete('/:reviewId/delete',CodeReview.deleteReview);
router.get('/',CodeReview.getReviews)
module.exports = router;

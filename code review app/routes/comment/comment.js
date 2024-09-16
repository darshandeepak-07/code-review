const Comment = require('../../controller/comment/comment');
const express = require('express');
const router = express.Router();
router.get('/reviews/:userId/:reviewId/comments',Comment.getComments);
router.post('/reviews/:userId/:reviewId/comments/add',Comment.addComment);
router.put('/reviews/:userId/:reviewId/comments/:commentId/edit',Comment.editComment);
router.delete('/reviews/:userId/:reviewId/comments/:commentId/delete',Comment.deleteComment);
module.exports = router;
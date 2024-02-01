const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  commenter : {type:String,required:true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: String, default: function(){
    const date = new Date();
    return date.toLocaleDateString('en-US',{
        year: 'numeric',
        month:'long',
        day : '2-digit'
    });
  }},
  reviewId : {type: String , required: true },
  commentId : {type:String, default : uuidv4 ,unique:true}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

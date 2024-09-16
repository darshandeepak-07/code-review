const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const codeReviewSchema = new mongoose.Schema({
    title :{type: String ,required : true },
    description : {type: String, required: true } ,
    code : {type:String ,required: true},
    reviewId : {type :String,default:uuidv4 ,unique:true,required:true},
    repositoryURL : {type: String, required: true},
    createdBy : {type:mongoose.Schema.Types.ObjectId , ref: 'User', required:true},
    createdAt : {type: String, default: function(){
        const date = new Date();
        return date.toLocaleDateString('en-US',{
            year: 'numeric',
            month:'long',
            day : '2-digit'
        });
    }},
    comments : [{type:mongoose.Schema.Types.ObjectId , ref : 'Comment'}],
    reviewers : [{type: mongoose.Schema.Types.ObjectId, ref : 'User'}]
})

const CodeReview = mongoose.model('CodeReview',codeReviewSchema);
module.exports = CodeReview;
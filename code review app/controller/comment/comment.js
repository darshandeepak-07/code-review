const Comment = require('../../models/comment/comment');
const CodeReview = require('../../models/codereview/codereview');
const User = require('../../models/user/user');

const addComment = async(request,response)=>{
    const reviewId = request.params.reviewId;
    
    const comment = new Comment({
        text:request.body.text,
        commenter : request.body.email,
        reviewId : reviewId
    })
    try{    
        const commenter = await User.findOne({email:request.body.email});
        const review = await  CodeReview.findOne({reviewId:reviewId});

        review.comments.push(comment);
        comment.createdBy = commenter._id;
        await review.save();
        await comment.save();
        response.send("Comment Added to review Successfully");
    }catch(err){
        response.status(400).send("Error adding comment "+err)
    }
}

const editComment = async(request,response)=>{
    const reviewId = request.params.reviewId;
    const commentId = request.params.commentId;
    const updatedComment = request.body;
    try{
        // Check if comment Id exist in the specific review id
        const review = await CodeReview.findOne({reviewId:reviewId})
                        .populate('comments');
        
        if(!review){
            return response.send("Comment not found");
        }
        const commentExist = review.comments.find(async(id)=>{
            try{
                const comment = await Comment.findById(id);
                if(comment.commentId === commentId){
                    return comment;
                }
            }
            catch(err){
                console.log(err);
            }
        });
        if(commentExist){
            
            try{
                await Comment.findOneAndUpdate({commentId:commentId},{$set:updatedComment});
                response.status(200).send("Comment Updated Succesfully");
            }catch(err){
                response.send("Error Occures in Editing comment "+err);
            }
        }else{
            response.status(400).send("Comment Not found");
        }
        

    }catch(err){
        response.status(400).send("Error editing comment"+err)
    }
}

const deleteComment = async(request,response)=>{
    const reviewId = request.params.reviewId;
    const commentId = request.params.commentId;
    try{
        // Check if comment Id exist in the specific review id
        const review = await CodeReview.findOne({reviewId:reviewId})
                        .populate('comments');
        
        if(!review){
            return response.send("Comment not found");
        }
        const commentExist = review.comments.find(async(id)=>{
            try{
                const comment = await Comment.findById(id);
                if(comment.commentId === commentId){
                    return comment;
                }
            }
            catch(err){
                console.log(err);
            }
        });
        if(commentExist){
            
            try{
                CodeReview.updateOne({reviewId:reviewId},{$pull:{comments : commentExist._id}})
                .then(res=>Comment.findOneAndDelete({commentId:commentId}).then(res=>response.send("Comment Deleted")).catch(err=>response.send("Error deleting comment "+err))
                ).catch(err => response.send("Error Deleting comment "+err))

                await Comment.findOneAndDelete({commentId:commentId});
                response.status(200).send("Comment Deleted Succesfully");
            }catch(err){
                response.send("Error Occures in deleting comment "+err);
            }
        }else{
            response.status(400).send("Comment Not found");
        }
    }catch(err){
        response.status(400).send("Error deleting comment"+err)
    }
        

}
const getComments = async(request,response)=>{
    const reviewId = request.params.reviewId;
    try{    
        const comments = await Comment.find({reviewId:reviewId}).select('-_id -__v -reviewId -commentId').populate({
            path : 'createdBy',
            select : '-password -role -_id -__v -userId -registerDate'
        });
        response.status(200).send(comments);
            
        

    }catch(err){
        response.send("Error Getting comments "+err )
    }
}
module.exports = {
    addComment,
    editComment,
    deleteComment,
    getComments
}
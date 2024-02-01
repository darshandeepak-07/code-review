const CodeReview = require('../../models/codereview/codereview')
const User = require('../../models/user/user')

const createReview = async(request,response)=>{
    const user = await User.findOne({userId:request.params.userId});
    const {title,description,code,repositoryURL,reviewers}  = request.body;
    
    try{
        

        const codeReview = new CodeReview({
            title: title,
            description: description,
            code: code,
            repositoryURL: repositoryURL,
            createdBy: user._id,
           
        });
        reviewers.map(email=>{
            User.findOne({email:email})
            .then(user=>
            {
                codeReview.reviewers.push(user._id);
            })
           .catch(err=>console.log("Error fetching reviewer"));
            
        });
       
        
        try{
            setTimeout(async()=>{
                await User.findOneAndUpdate({userId:request.params.userId},{$inc:{totalRevision:1}});
                await codeReview.save();
                response.send("Review created successfully");
            },2000);
        }catch(err){
            response.send("Error Creating review"+err);
        }
       
    }catch(err){
        response.send("Error Creatig review " +err);
    }
}

const getReview = async(request,response)=>{
    const reviewid = request.params.reviewId;
    try{
        const review = await CodeReview.findOne({reviewId:reviewid})
        .select('-reviewId -_id -__v')
        .populate(
            {
                path : 'reviewers',
                select : '-password -userId -totalRevision -_id -role -__v'
            }
        );
        response.status(200).send(review);
    }catch(err){
        response.send("Error getting review")
        console.log("Error getting Review "+err )
    }

}

const editReview = async(request,response)=>{
    const reviewid = request.params.reviewId;
    try{
        
        await CodeReview.findOneAndUpdate({reviewId:reviewid},{$set:request.body},{new:true})
       
        response.status(200).send("Review Updated Successfully");
    }catch(err){
        response.status(400).send("Error Editing Review "+err);
    }
}

const deleteReview = async(request,response)=>{
    const reviewid = request.params.reviewId;

    try{
        const review = await CodeReview.findOne({reviewId:reviewid});
        await User.findByIdAndUpdate(review.createdBy,{$inc:{totalRevision:-1}})
        setTimeout(()=>{
            review.deleteOne()
            .then(res=> response.status(200).send("Review Deleted Successfully"))
            .catch(err=>response.status(400).send("Error deleting review "+err));
           
        },1000);
        
        
    }catch(err){
        response.status(400).send("Error deleting review "+err);
    }
}

const getReviews = async(request,response)=>{
    try{
        const reviews = await CodeReview.find({})
        .select('-reviewId -_id -__v')
        .populate(
            {
                path : 'reviewers',
                select : '-password -userId -totalRevision -_id -role -__v'
            }
        );
        response.status(200).send(reviews)
    }catch(err){
        response.status(400).send("Error fetching code reviews")
    }
}
module.exports = {
    createReview,
    getReview,
    editReview,
    deleteReview,
    getReviews
}
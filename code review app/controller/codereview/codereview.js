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


module.exports = {
    createReview
}
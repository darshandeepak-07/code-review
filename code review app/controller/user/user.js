const { response, request } = require("express");
const User = require('../../models/user/user');


const findUser = async(request,response)=>{
    try{
        const user = await User.findOne({userId : request.params.userId}).select('-password -_id -__v');
        response.status(200).send(user);
    }catch(err){
        response.status(404).send("User Does not Exist");
    }

}

const editUser = async(request,response)=>{
    try{
        const updates = request.body;
        if(!request.body.hasOwnProperty("password")){
            User.findOneAndUpdate({userId : request.params.userId},updates,{new : true})
            .then(result => response.status(200).send("User Updated Successfully"))
            .catch(err => response.status(404).send("Error occured while Editing user"))
        }else{
            response.status(404).send("Password could not be editted")
        }
    }catch(err){
        response.status(404).send("User Edit Unsuccessful"+err);
    }
}

module.exports = {
    findUser,
    editUser
}
const { response, request } = require("express");
const User = require('../../models/user/user');
const {createHash,compareHash} = require('../../middlewares/bcrypt');
const bcrypt = require('bcrypt')
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
        }
        else{
            response.status(406).send("Password could not be editted")
        }
    }catch(err){
        response.status(404).send("User Edit Unsuccessful"+err);
    }
}

const pwdEdit = async(request,response)=>{
    try{
        const  { newpassword , oldpassword }  = request.body;
        const user = await User.findOne({userId : request.params.userId});
        const auth = await compareHash(oldpassword,user.password);
        if(auth){
            createHash(newpassword)
            .then(pwd=>{
                    User.updateOne({userId:request.params.userId},{$set:{password:pwd}})
                    .then(res=>response.send("Password Changed Successfully"))
                    .catch(err=> response.status(404).send("Error Occured in Changing password"+err));
            })
            .catch(err=>response.send("Error"+err));
        }else{
            response.send("Old password mismatch")
        }
       
        
    }catch(err){
        response.status(404).send("Error changing Password .."+err);
    }
}


module.exports = {
    findUser,
    editUser,
    pwdEdit
}
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
module.exports.index = (req,res)=>{
    res.render('index',{
        title:"Home page"
    })
}

module.exports.signup_get = (req,res)=>{
    res.render('signup_get',{
        title:"Sign Up page"
    });
}

module.exports.signup_post = async(req,res)=>{
    const {name,email,phone,password} = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password,saltRounds);
    try {
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashPassword
        })
        user.save();
        res.send("User created successfully");
    } catch (error) {
        console.log("Error: " + error);
    }
}

module.exports.getUser = async (req,res)=>{
    const id = req.params.id;
    try {
    const user = await User.findById(id);
    res.send(user);
    } catch (error) {
        console.log("Error: " + error);
    }
}

module.exports.getAllUsers = async(req, res) =>{
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log("Error: " + error);
    }
}

module.exports.deleteUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const delUser = await User.findByIdAndDelete(id);
        res.send("User deleted successfully")
    } catch (error) {
        console.log("Error"+ error);
    }
}

module.exports.updateUser = async (req,res)=>{
    var id = req.params.id;
    try {
        var updateUser = await User.findByIdAndUpdate(id);
        updateUser.save();
        res.send("User updated successfully")
    } catch (error) {
        console.log("Error updating user"+ error);
    }
}
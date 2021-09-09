const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user.js');

const signin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password); 

        if(!isPasswordCorrect) return res.status(400).json({message :"Invalid credentials"});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"}) 

        res.status(200).json({result:existingUser,token});
    }catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const signup = async(req,res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body;
    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message : "User already exist"});
        if(password!==confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"30d"}) 

        res.status(200).json({result,token});
    }catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
}

const favPost = async (req, res) => {
    const { id,poster,title,date,media_type,vote_average } = req.params;
    // console.log(req.params);
    // console.log(req.userId);
    
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    const user = await User.findOne({_id : req.userId});
    const watchlist = user.watchlist;
    // console.log(watchlist);
    // console.log(id);
    const index = watchlist?.findIndex((item) => id===(String(item.id)));

    // console.log(index);

    if(index===-1){
        user.watchlist.push({id,poster,title,date,media_type,vote_average});
    }
    else{
        user.watchlist = user.watchlist.filter((item)=> (String(item.id)) !== id);
    }
    // console.log(user.watchlist);
    const updatedUser = await User.findByIdAndUpdate(req.userId, user, { new: true });
    res.status(200).json(updatedUser);
    
}

const getUser = async (req, res) => {
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    const user = await User.findOne({_id : req.userId});
    res.status(200).json(user);
}

module.exports = {signin,signup,favPost,getUser}
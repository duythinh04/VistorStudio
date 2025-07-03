const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db=require("../models")
const User=db.User

exports.register = async(req,res)=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
        });
        res.status(201).json({
            message:"Dang ki thanh cong",userId:newUser.id
        })
    } catch(err){
        res.status(500).json({message:"Loi dang ki",error:err.message})
    }
};

exports.login=async(req,res)=>{
    try{
        const { username, password } = req.body;
        const user= await User.findOne({where:{username}});
        if(!user) return res.status(404).json({message:"Nguoi dung khong ton tai"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:"Sai mat khau"});

        const token=jwt.sign(
            {id: user.id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        res.json({token, user:{id:user.id,username:user.username,role:user.role} });
    }
    catch(err){
        res.status(500).json({message: "Lỗi đăng nhập", error: err.message})
    }
}
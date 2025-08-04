const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require('../models');
const User = db.User;
const Post = db.Post;

exports.selectAll = async(req,res)=>{
    try{
        const dspost=await Post.findAll({
            order:[['id','ASC']],
            include: [
                {
                model: User,
                attributes: ['id', 'username'],
                },
            ]
        });
        res.json(dspost)
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
}
exports.selectById=  async (req, res) => {
  try {
    const onepost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ]
    });
    if (!onepost) return res.status(404).json({ message: 'Post not found' });

    res.json(onepost);
  } catch (err) {
      console.error(err);
    res.status(500).json({ message: err.message });
  }
}
exports.addPost = async(req,res)=>{
    try{
        const {title, status, userId, imageUrl} = req.body;
        const existpost=await Post.findOne({where:{title}})
        if(existpost){
            return res.status(400).json({message:"Tiêu đề bị trùng"});
        }
        const post= await Post.create({
            title, status, userId, imageUrl
        })
        res.status(201).json(post)
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
exports.updatePost = async(req,res)=>{
    try{
        const editpost=await Post.findByPk(req.params.id)
        if(!editpost) return res.status(404).json({message:'Not found'})
            const {title, status, userId,imageUrl} =req.body
        await editpost.update({title, status, userId, imageUrl})
        res.status(200).json(editpost)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}
exports.deletePost= async(req,res)=>{
    try{
        const deletepost= await Post.findByPk(req.params.id)
        if(!deletepost) return res.status(404).json({message:'Not found'})
            await deletepost.destroy();
        res.json({message:'delete done'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
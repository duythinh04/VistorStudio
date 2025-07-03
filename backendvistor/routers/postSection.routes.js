const express = require('express');
const router=express.Router();
const db = require('../models');
const Post = db.Post;
const PostSection = db.PostSection;
const verifyToken = require('../middleware/verifyToken');


router.get('/posts/:postId/sections', async(req,res)=>{
    try{
        const sections=await PostSection.findAll({
            where:{postId: req.params.postId},
            order:[['order','ASC']],
        });
        res.json(sections);
    } catch(err){
        res.status(500).json({
            message:err.message
        });
    }
});

router.post('/posts/:postId/sections',verifyToken,async(req,res)=>{
    try{
        const { text,imageUrl, order} =req.body;
        const section= await PostSection.create({
            text,
            imageUrl,
            order,
            postId:req.params.postId,
        })
        res.status(201).json(section);
    } catch(err){
        res.status(400).json({message:err.message});
    }
});

router.put('/posts/:postId/sections/:sectionId',verifyToken, async(req,res)=>{
    try{
        const section=await PostSection.findByPk(req.params.sectionId);
        if(!section) return res.status(404).json({message:'Not found'});
        if (section.postId !== Number(req.params.postId)) {
        return res.status(400).json({ message: "Section không thuộc post này" });
}       
        const {text, imageUrl, order} = req.body;
        await section.update({text,imageUrl,order});
        res.json(section);
    } catch(err){
        res.status(400).json({message:err.message});
    }
});

router.delete('/posts/:postId/sections/:sectionId',verifyToken,async(req,res)=>{
    try{
        const section=await PostSection.findByPk(req.params.sectionId);
        if(!section) return res.status(404).json({message:'Not found'});

        await section.destroy();
        res.json({message:'Deleted successully'});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
module.exports = router;
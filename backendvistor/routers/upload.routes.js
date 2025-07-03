const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
router.post('/upload-image',verifyToken, upload.single('image'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:'Khong co file anh'});
    }
const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({
        message:'Upload done',
        filename:req.file.filename,
        imageUrl:imageUrl
    });
});
module.exports = router;
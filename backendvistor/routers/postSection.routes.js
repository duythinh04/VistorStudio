const express = require('express');
const router=express.Router();
const verifyToken = require('../middleware/verifyToken');
const sectionController=require("../controllers/section.controller");

router.get('/posts/:postId/sections', sectionController.selectSec);

router.post('/posts/:postId/sections',verifyToken,sectionController.addSec);

router.put('/posts/:postId/sections/:sectionId',verifyToken, sectionController.updateSec);

router.delete('/posts/:postId/sections/:sectionId',verifyToken,sectionController.deleteSec);
module.exports = router;
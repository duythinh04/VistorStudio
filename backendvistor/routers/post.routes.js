const express = require('express')
const router = express.Router()
const postController=require("../controllers/post.controller");
const verifyToken = require('../middleware/verifyToken');


router.get('/', postController.selectAll);
router.get('/:id',postController.selectById);
router.post('/',verifyToken, postController.addPost);

router.put('/:id',verifyToken,postController.updatePost);
router.delete('/:id',verifyToken,postController.deletePost);
module.exports = router;
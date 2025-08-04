const express = require('express');
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");
const verifyToken = require('../middleware/verifyToken');
const userController = require("../controllers/user.controller");
    
router.get('/',verifyToken,isAdmin, userController.selectAllUser);

router.post('/',verifyToken,isAdmin, userController.addUser);

router.put('/:id',verifyToken,isAdmin, userController.editUser);


router.delete('/:id',verifyToken,isAdmin, userController.deleteUser)
module.exports = router;
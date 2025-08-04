const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');

exports.selectAllUser = async (req,res)=>{
    try{
        const user=await User.findAll(
            {
                order:[['id','ASC']],
                attributes: { exclude: ['password'] }
            }
        );
        res.json(user);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
exports.addUser = async(req,res)=>{
    try{
        const { username,email,password,role } = req.body

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role
                            });
    } catch(err){
        res.status(400).json({message:err.message})
    }
}
exports.editUser = async (req, res) => {
  try {
    const edituser = await User.findByPk(req.params.id);
    if (!edituser) return res.status(404).json({ message: 'User not found' });

    const { username, email, password, role } = req.body;

        const updatedPassword = password 
        ? await bcrypt.hash(password, 10) 
        : edituser.password;

    await edituser.update({
      username,
      email,
      password: updatedPassword,
      role
    });
    res.status(200).json({id: edituser.id,
  username: edituser.username,
  email: edituser.email,
  role: edituser.role});;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.deleteUser =  async(req,res)=>{
    try{
        const deleteuser=await User.findByPk(req.params.id);
        if(!deleteuser) return res.status(404).json({message:'Not found'})
        await deleteuser.destroy()
        res.json({message:'Delete done'})
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
}
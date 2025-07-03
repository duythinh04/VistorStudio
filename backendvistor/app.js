const express = require('express');
const cors = require('cors');
const app=express();
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running');
});

const postSectionRoutes=require('./routers/postSection.routes');
app.use('/api', postSectionRoutes);
const userRoutes = require('./routers/user.routes');
app.use('/api/users', userRoutes);
const postRoutes = require('./routers/post.routes');
app.use('/api/posts', postRoutes);
const authRoutes = require('./routers/auth.routes');
app.use('/api/auth', authRoutes)
const uploadRoutes = require('./routers/upload.routes');
app.use('/api', uploadRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app;

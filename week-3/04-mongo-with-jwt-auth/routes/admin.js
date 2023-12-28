const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt=require("jsonwebtoken");
const {Admin, User}=require("../db");
const {JWT_SECRET} = require("../config.js");
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;
    await Admin.create({
        username:username,
        password:password,
    })
    
        res.json({
            msg:"Admin created successfully!"
        })
    
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username,password}=req.body;
    const user=await User.find({
        username:username,
        password:password
    })
    if(user){
        const token=jwt.sign({username},JWT_SECRET);
    res.json({
        token
    })

    }else{
        res.status(411).json({
           msg:"Incorrect email or password"
        })
    }
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;
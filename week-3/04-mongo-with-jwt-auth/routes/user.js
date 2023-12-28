const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {JWT_SECRET}=require("../config.js");
const jwt=require("jsonwebtoken");
const User=require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username,password}=req.body;
    await User.create({
        username:username,
        password:password,
    })
    
        res.json({
            msg:"Admin created successfully!"
        })

});

router.post('/signin',async (req, res) => {
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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router
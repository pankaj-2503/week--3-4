const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}=require('../db');
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username,password}=req.body;
    User.create({
        username,
        password
    })
    res.json({
        msg:"Sign up Successfully!"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response=await Course.find({});
    res.json({
        courses:response
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    username.updateOne({
        username:username
    },{
       "$push":{
        purchasedCourses:courseId
       }
    });
    res.json({
        msg:"purchased !"
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user=await User.findOne({
        username:username.req.headers.username
    })
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        courses:courses
    })

});

module.exports = router
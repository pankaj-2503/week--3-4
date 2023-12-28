const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course}=require("../db")

// Admin Routes
router.post('/signup',async (req, res) => {
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

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const {title,description,imageLink,price}=req.body;
    const course=await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })
    res.json({
        msg:"course created successfully",courseId:course._id
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const response=await Course.find({});
    res.json({
        courses:response
    })
    
       
    
});

module.exports = router;
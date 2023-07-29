const router = require('express').Router();
const { response } = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/register' , async (req , res) =>{
    try {
       const userExists = await User.findOne({email: req.body.email}) 
       if( userExists){
        return res
        .status(200)
        .send({message: "User already exists",success:false});
       }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);
       req.body.password = hashedPassword;
       const newUser = newUser(req.body);
       await newUser.save();
       response.send({
        message: "User created successfully",
        success : true
       });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data : error,
            success: false,

    });
    }
});

module.exports = router;
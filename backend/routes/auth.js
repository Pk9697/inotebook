const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET='CodeWithHarry';
const fetchuser=require('../middleware/fetchuser');

//ROUTE1: create a user using:POST "/api/auth/createuser".Doesn't require auth
router.post('/createuser',[
  body('name','Enter a valid name').isLength({ min: 3 }),
    // username must be an email
  body('email','Enter a valid name').isEmail(),
  // password must be at least 5 chars long
  body('password','pass must be atleast 5 char').isLength({ min: 5 })
],async (req,res)=>{
    let success=false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    // const user=User(req.body);
    // user.save();
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
      success=false;
      return res.status(400).json({success,error:"Sorry user with this email already exists"})
    }

    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

      user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      success=true;
      // console.log(authToken);
      // res.json(user);
      res.json({success,authToken});
    // res.json([]);
    }catch(error){
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
})

//ROUTE2: authenticate a user using:POST "/api/auth/login" .No login required
router.post('/login',[
  body('email','Enter a valid name').isEmail(),
  body('password','password can not be blank').exists()

],async (req,res)=>{
  let success=false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    let user=await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({error:"Sorry user does not exist"})
    }

    const passCompare=await bcrypt.compare(req.body.password,user.password);
    if(!passCompare){
      success=false;
      return res.status(400).json({success,error:"Password error"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    console.log(authToken);
    // res.json(user);
    success=true;
    res.json({success,authToken});

  }catch(error){
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
})


 
//ROUTE3: GET LOGGEDIN USER DETAILS using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");//getuser without password
    res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
})

module.exports=router;
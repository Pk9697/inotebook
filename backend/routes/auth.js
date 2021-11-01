const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');

//create a user using:POST "/api/auth/".Doesn't require auth
router.post('/',[
  body('name','Enter a valid name').isLength({ min: 3 }),
    // username must be an email
  body('email','Enter a valid name').isEmail(),
  // password must be at least 5 chars long
  body('password','pass must be atleast 5 char').isLength({ min: 5 })
],(req,res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    // const user=User(req.body);
    // user.save();
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      }).then(user => res.json(user));
    // res.json([]);
})

module.exports=router;
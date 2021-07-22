const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = express();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
// const verify = require('verifiy');

router.post('/signup',(req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => { 
        if (err) 
        {
            return res.status(500).json({
                error: err
            });
        }
        else 
        {
            ///123456
            const otp = Math.floor(
                Math.pow(10,  - 1) +
                  Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)
              );
              //nodemailer for send otp in mail
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'pp9124229@gmail.com',
                  pass: 'Raj@5656'
                }
              });
              
              var mailOptions = {
                from: 'pp9124229@gmail.com',
                to: 'rajkansara00@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              ///send api verify otp
       

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                otp : otp
                
            });
           
            user.save()   
            .then(result => {
                res.status(201).json({
                  new_user: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err 
                })
            })
        }
    
    })
});



router.post('/login',async (req,res,next)=>{
 const user = await  User.find({username:req.body.username})
  .exec()
  .then(user=>{
    if(user.length < 1)
    {
      return res.status(401).json({
        msg:'user not found'
      })
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(!result)
      {
        return res.status(401).json({
          msg:'pass not match'
        })
      }
      if(result)
      {
        const token = jwt.sign({
          username:user[0].username,
          email:user[0].email,
          phone:user[0].phone
        },
          'this is dummy data',
          {
            expiresIn:"12h"
          }
        );
      
        res.status(200).json({
          username:user[0].username,
          email:user[0].email,
          phone:user[0].phone,
          token:token
        })
      }
    })
    
})
.catch(err => {
  res.status(500).json({
    err:err
 
    })
  })
  
})
module.exports = router;
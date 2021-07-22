const express = require("express");
const router1 = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = express();
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const router = require("./user");
//const verify = require("verify");

router1.post('/verify',async (req,res) => {
    const {id,otp} = req.body
    try {
        const loginUser =  await User.findById(id)
        if(loginUser.otp===otp){
            loginUser.isVerify = true
            loginUser.otp = undefined
            await loginUser.save()
         res.json({verified: true})
        }else{
         res.json({verified : false})
        }
    }catch(error){
        console.log(error)
            res.status(500).json({message : 'Error finding user'})
    }
  
    // try{  
    //     const path = '/user/${username}'
    //   ///  const user = db.getData(path)

    //     const otp = user.otp
    //     const verify = user.verify({otp});
        
    //     if(verify){
    //         db.push(path,{username: username,otp:otp})
    //         res.json({verified: true})
    //     }else{
    //         res.json({verified : false})
    //     }
    // } catch(error){
    //     console.log(error)
    //     res.status(500).json({message : 'Error finding user'})
    // }
})
// router1.post('/verify1',(request, response) => {
//     let myJson = request.body;      // your JSON
// 	let username = request.body.username;	// a value from your JSON
//     let password1 = request.body.password;
//     let otp1 = request.body.otp;
// 	response.send(username+" "+password1+""+otp1);	 // echo the result back
     
// })

// router1.get('/verify2',(request, response) => {
 
// {
// if (response._username == request.body.username && response.otp == request.body.otp) {
//             console.log("OK");
//           }
//           else{
//             console.log(response._username && response.otp);
//           }
//         }
//     });
//     else{
//         res.render('otp',{msg : 'otp is incorrect'});
//     }
// //  }); 
    // var user_name = req.body.user;
    // var otp = req.body.otp;
    // console.log("User name = "+user_name+", otp is ="+password);
    // res.end("yes");

//     let json = JSON.parse(req.body);
//     console.log(JSON.stringify(json));
    
// });

module.exports = router1;


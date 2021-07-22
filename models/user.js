const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email: { type: String, required: true },
    otp:Number,
    isVerify :{
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('User',userSchema);
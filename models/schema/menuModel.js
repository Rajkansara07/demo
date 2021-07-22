const mongoose = require('mongoose');

// const menuhoursSchema = new mongoose.Schema({
//   openDay: Array,
//   start_time: { type: String, default: '00:00' },
//   end_time: { type: String, default: '24:00' }
// });

const menuSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      
    },
    name: {
      type: String
    },
    note: {
      type: String
    },
   // menuHours: [
     // {
        //openDay: Array,
       // start_time: { type: String, default: '00:00' },
      //  end_time: { type: String, default: '24:00' }
    // }
    //],

    //__v: { type: Number, select: false }
  //},
  //{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  });

const MenuModel = mongoose.model('menu', menuSchema);
module.exports = MenuModel;

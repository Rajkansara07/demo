const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'menu'
    },
    usedIn: [
      {
        type: mongoose.Schema.ObjectId,
       
      }
    ],
    sellAsIndependent: Boolean,
    note: String,
    name: String,
    photo: String,
    photo_height: Number,
    photo_width: Number,
    desc: String,
    
    categories: [
      {
        category_id: {
          type: mongoose.Schema.ObjectId,
          ref: 'category'
        },
        order: {
          type: Number,
          default: 0
        }
      }
    ],
    ///premisesType: Array,
    premisesType: {
      type: String,
      enum: ['corporate', 'residential']
    },
    unit: {
      type: String,
      enum: ['squarefeet', 'flat', 'hourly', 'litre']
    },

    defaultPrice: Number,
    stock: {
      isOutOfStock: {
        type: Boolean,
        default: false
      },
      status: {
        type: String,
        enum: ['soldOutToday', 'soldOutIndefinitely']
      }
    },
    status: {
      type: String,
      enum: ['Active', 'Delete'],
      default: 'Active'
    },
    taxInfo: { taxrate: Number, taxItemCategory: String },
    service_time: Number,
    __v: { type: Number, select: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const itemModel = mongoose.model('items', itemSchema);
module.exports = itemModel;

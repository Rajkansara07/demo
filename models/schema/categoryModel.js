const mongoose = require('mongoose');

const photo = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['Active', 'Delete', 'Inactive'],
      default: 'Active'
    },
    upload_status: {
      type: Boolean,
      default: false
    },
    path: String
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const categorySchema = new mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'menu'
    },
    name: String,
    note: String,
    category_photo: [photo],
    menu: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'menu'
      }
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    __v: { type: Number, select: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
categorySchema.pre(/^find/, function(next) {
  this.populate({
    path: 'menu',
    select: '_id'
  });
  next();
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;

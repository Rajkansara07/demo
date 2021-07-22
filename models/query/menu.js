/* eslint-disable node/no-unsupported-features/es-syntax */
//const getDimensions = require('get-video-dimensions');
const mongoose = require('mongoose');

const s3 = require('../../services/s3services/s3upload');

//const s3video = require('../../services/s3services/s3videoupload');
//const AppError = require('../../utils/appError');
//const APIFeatures = require('../../utils/apiFeatures');
const Menu = require('../schema/menuModel');
const Category = require('../schema/categoryModel');
const Item = require('../schema/itemModel');
//const Modifier = require('../schema/modifierModel');
const itemModel = require('../schema/itemModel');

module.exports = {
  add_menu: async data => {
    return new Promise(async (resolve, reject) => {
      
      await new Menu(data)
        .save()
        .then(result => {
         

          resolve(result);
        })
        
        .catch(error => {
          reject(error);
        });
    });
},
view_menu: async req => {
  return new Promise(async (resolve, reject) => {
    let _id;
    if (req.query.menu_id) {
      menuId = { _id: req.query._id };
    }
    if (req.query._id) {
      menuId = { ...menuId, _id: req.query._id };
    }
    await Menu.find(_id)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
delete_menu: async req => {
  return new Promise(async (resolve, reject) => {
    await Menu.findByIdAndDelete(req.params.id)
      .lean()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
get_menu: async menuId => {
  return new Promise(async (resolve, reject) => {
    await Menu.findById(menuId)
      .lean()
      // .populate('menu')
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
update_menu: async req => {
  return new Promise(async (resolve, reject) => {
    await Menu.findByIdAndUpdate(req.body.id, req.body, {
      new: true
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
add_category: async data => {
  return new Promise(async (resolve, reject) => {
    await new Category(data)
      .save()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });

},
view_category: async req => {
  return new Promise(async (resolve, reject) => {
    let categoryId;
    if (req.query.category_id) {
      categoryId = {
        _id: req.query.category_id
      };
    }
    if (req.query.member_id) {
      categoryId = { ...categoryId, member_id: req.query.member_id };
    }

    await Category.find(categoryId)
      // .populate('menu')
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });

},
delete_category: async req => {
  return new Promise(async (resolve, reject) => {
    await Category.findByIdAndDelete(req.params.id)
      .lean()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
update_category: async req => {
  return new Promise(async (resolve, reject) => {
    await Category.findByIdAndUpdate(req.body.id, req.body, {
      new: true
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
get_category_csv: async categoryId => {
  return new Promise(async (resolve, reject) => {
    await Category.findById(categoryId)
      .lean()
      // .populate('menu')
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},

add_item: async data => {
  return new Promise(async (resolve, reject) => {
    
    await new Item(data)
      .save()
      .then(result => {
       

        resolve(result);
      })
      
      .catch(error => {
        reject(error);
      });
  });

},
get_item: async itemId => {
  return new Promise(async (resolve, reject) => {
    await itemModel
      .findById(itemId)
      .lean()
      // .populate('menu')
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });

},
view_item: async req => {
  return new Promise(async (resolve, reject) => {
    // let itemId = { status: 'Active' };
    // if (req.query.item_id) {
    //   itemId = { ...itemId, _id: req.query.item_id };
    // }
    // if (req.query.member_id) {
    //   itemId = { ...itemId, member_id: req.query.member_id };
    // }
    // if (req.query.category_id) {
    //   itemId = { ...itemId, categories: { $in: [req.query.category_id] } };
    // }
    // await Item.find(itemId)
    //   .limit(Number(req.query.limit))
    //   .skip(Number(req.query.skip))
    //   .select('-categories._id')
    //   .populate({
    //     path: 'usedIn',
    //     select: 'name _id itemSelect',
    //     populate: {
    //       path: 'contains',
    //       select: 'name _id defaultPrice'
    //     }
    //   })
    //   .populate({
    //     path: 'categories.category_id',
    //     select: '-menu name _id'
    //   })
    let itemId = { status: 'Active' };
    if (req.query.item_id) {
      itemId = { ...itemId, _id: mongoose.Types.ObjectId(req.query.item_id) };
    }
    if (req.query.member_id) {
      itemId = {
        ...itemId,
        member_id: mongoose.Types.ObjectId(req.query.member_id)
      };
    }
    if (req.query.category_id) {
      itemId = {
        ...itemId,
        categories: {
          $elemMatch: {
            category_id: mongoose.Types.ObjectId(req.query.category_id)
          }
        }

        // categories: {
        //   $in: [
        //     '$category_id',
        //     mongoose.Types.ObjectId(req.query.category_id)
        //   ]
        // }
      };
    }
    console.log('itemId:::', itemId);
    await itemModel
      .aggregate([
        {
          $match: itemId
        },
        {
          $lookup: {
            from: 'categories',
            let: {
              categoryid: '$categories.category_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in: ['$_id', '$$categoryid']
                      },
                      {
                        $eq: ['$status', 'Active']
                      }
                    ]
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  _id: 1
                }
              }
            ],
            as: 'categories'
          }
        },
        {
          $lookup: {
            from: 'modifiers',
            let: {
              usedIn: '$usedIn'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in: ['$_id', '$$usedIn']
                      }
                    ]
                  }
                }
              },
              {
                $lookup: {
                  from: 'items',
                  let: {
                    contains: '$contains'
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            {
                              $in: ['$_id', '$$contains']
                            }
                          ]
                        }
                      }
                    },
                    {
                      $project: {
                        name: 1,
                        _id: 1,
                        defaultPrice: 1
                      }
                    }
                  ],
                  as: 'contains'
                }
              },
              {
                $project: {
                  name: 1,
                  _id: 1,
                  itemSelect: 1,
                  contains: 1
                }
              }
            ],
            as: 'usedIn'
          }
        }
      ])
      .then(result => {
        console.log('qurey response::', result);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
delete_item: async req => {
  return new Promise(async (resolve, reject) => {
    await Item.findByIdAndUpdate(req.params.id, { status: 'Delete' })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
update_item: async (itemId, data, req) => {
  return new Promise(async (resolve, reject) => {
    const item = await Item.findById(itemId);
    if (req.file !== undefined) {
      const name = `hoookedup-works/${item.member_id}/item/${item.id}/${
        req.file.key.split('/')[1]
      }`;
    }
    await Item.findByIdAndUpdate(itemId, data, {
      new: true
    })
      .populate({
        path: 'usedIn',
        select: 'name _id itemSelect',
        populate: {
          path: 'contains',
          select: 'name _id defaultPrice'
        }
      })
      .populate({
        path: 'categories',
        select: '-menu name _id'
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
},
add_item_photo: async (req, next, res) => {
  return new Promise(async (resolve, reject) =>  {
      if (req.file !== undefined) {
        if (!req.file.mimetype.startsWith('image')) {
          return next(new AppError('wrong format file uploaded', 400));
        }
        if (err) {
          return res.status(500).send({ status: false, error: err });
        }
        await Item.findByIdAndUpdate(
          req.params.id,

          { $set: { servicemenu: req.file.name } },
          { new: true }
        )
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        resolve([]);
      }
    });
  }

};
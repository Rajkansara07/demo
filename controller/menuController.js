const mongoose = require('mongoose');
//const FastCsv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');
//const AppError = require('../utils/appError');
//const catchAsync = require('../utils/catchAsync');
const menu = require('../models/query/menu');
const auth = require('../models/query/auth');
const validation = require('../services/menu');
//const otherservices = require('../services/otherservices');
//const s3 = require('../services/s3services/s3upload');
//const s3Storage = require('multer-s3');

const itemModel = require('../models/schema/itemModel');


exports.addmenu =(async (req, res, next) => {
    const data = {
      name: req.body.name
    };
   
    try {
      await validation.add_menu.validateAsync(data);
    } catch (error) {
       //console.log(error);
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message
      });
    }
    const Menu = await menu.add_menu(req.body);
  
    const user = await auth.checkid(req.body.member_id);
  
    const afterData = Object.keys(req.body).map(data => {
      return { key: data, value: req.body[data] };
    });
  
    if (user.menu_log === null || user.menu_log === undefined) {
      await blank_log_generate(req.body.member_id, user);
    }
    await menu_log_generate(
      'menu',
      req.body.member_id,
      afterData,
      [],
      'Menu created'
    );
  
    res.status(201).json({
      status: true,
      message: 'Menu added successfully',
      id: Menu.id
    });
  });
  exports.viewmenu =(async (req, res, next) => {
    const menuList = await menu.view_menu(req);
    if (menuList.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'data not found'
      });
    }
  
    res.status(200).json({
      status: true,
      menuList
    });
  });
  exports.deletemenu = (async (req, res, next) => {
    const menuDetails = await menu.delete_menu(req);
  
   const user = await auth.checkid(menuDetails.member_id);
    const beforeData = Object.keys(menuDetails).map(data => {
      return { key: data, value: menuDetails[data] };
    });
  
    if (user.menu_log === null || user.menu_log === undefined) {
      await blank_log_generate(menuDetails.member_id, user);
    }
    await menu_log_generate(
      'menu',
      menuDetails.member_id,
      [],
      beforeData,
      'Menu Deleted'
    );
    res.status(200).json({
      status: true,
      id: menuDetails._id
    });
  });
  exports.updatemenu = (async (req, res, next) => {
    const menuDetails = await menu.get_menu(req.body.id);
    console.log(menuDetails);
    const beforeData = Object.keys(req.body).map(data => {
      return { key: data, value: menuDetails[data] };
    });
    const updatedMenu = await menu.update_menu(req);
    const user = await auth.checkid(menuDetails.member_id);
  
    const afterData = Object.keys(req.body).map(data => {
      return { key: data, value: req.body[data] };
    });
  
    if (user.menu_log === null || user.menu_log === undefined) {
      await blank_log_generate(menuDetails.member_id, user);
    }
    await menu_log_generate(
      'menu',
      menuDetails.member_id,
      afterData,
      beforeData,
      'menu updated.'
    );
    res.status(200).json({
      status: true,
      updatedMenu
    });
  });
  exports.addcategory = (async (req, res, next) => {
    const data = {
      name: req.body.name
    };
  
    try {
      await validation.add_category.validateAsync(data);
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message
      });
    }
  
    const Category = await menu.add_category(req.body);
  
    const user = await auth.checkid2(req.body.member_id);
  
    const afterData = Object.keys(req.body).map(data => {
      return { key: data, value: req.body[data] };
    });
  
    if (user.menu_log === null || user.menu_log === undefined) {
      await blank_log_generate(req.body.member_id, user);
    }
    await menu_log_generate(
      'category',
      req.body.member_id,
      afterData,
      [],
      'Category created'
    );
    res.status(201).json({
      status: true,
      message: 'category added successfully',
      id: Category.id
    });
  });
  exports.viewcategory = (async (req, res, next) => {
    const categorylist = await menu.view_category(req);
    if (categorylist.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'data not found'
      });
    }
    res.status(200).json({
      status: true,
      categorylist
    });
  });
  exports.deletecategory = (async (req, res, next) => {
    const Category = await menu.delete_category(req);
    const user = await auth.checkid2(Category.member_id);
    const beforeData = Object.keys(Category).map(data => {
      return { key: data, value: Category[data] };
    });
  
    if (user.menu_log === null || user.menu_log === undefined) {
      await blank_log_generate(Category.member_id, user);
    }
    await menu_log_generate(
      'category',
      Category.member_id,
      [],
      beforeData,
      'Category Deleted.'
    );
    res.status(200).json({
      status: true,
      id: Category.id
    });
  });
  
exports.updatecategory =(async (req, res, next) => {
  const categoryDetails = await menu.get_category_csv(req.body.id);
  const beforeData = Object.keys(req.body).map(data => {
    return { key: data, value: categoryDetails[data] };
  });
  const updatedCategory = await menu.update_category(req);
  const user = await auth.checkid2(categoryDetails.member_id);

  const afterData = Object.keys(req.body).map(data => {
    return { key: data, value: req.body[data] };
  });

  if (user.menu_log === null || user.menu_log === undefined) {
    await blank_log_generate(categoryDetails.member_id, user);
  }
  await menu_log_generate(
    'category',
    categoryDetails.member_id,
    afterData,
    beforeData,
    'category updated.'
  );
  res.status(200).json({
    status: true,
    updatedCategory
  });
});
exports.additem =(async (req, res, next) => {
  const data = {
    name: req.body.name
  };
 
 
  try {
    await validation.add_item.validateAsync(data);
  } catch (error) {
     console.log(error);
    return res.status(400).json({
      status: 'failed',
     // error: error.details[0].message
    });
  }
  const item = await menu.add_item(data, req);
  const itedDetails = await menu.get_item(item.id);
  const user = await auth.checkid3(itedDetails.member_id);

  const afterData = Object.keys(req.body).map(data => {
    return { key: data, value: req.body[data] };
  });

  if (user.menu_log === null || user.menu_log === undefined) {
    await blank_log_generate(req.body.member_id, user);
  }
  await menu_log_generate(
    'item',
    req.body.member_id,
    afterData,
    [],
    'item created'
  );

  res.status(201).json({
    status: true,
    message: 'item added successfully',
    id: item.id
  });
});
exports.getitem =(async (req, res, next) => {
  const itemlist = await menu.view_item(req);
  if (itemlist.length === 0) {
    return res.status(404).json({
      status: false,
      message: 'data not found'
    });
  }
  res.status(200).json({
    status: true,
    itemlist
  });
});
exports.deleteitem = (async (req, res, next) => {
  const Item = await menu.delete_item(req);
  const user = await auth.checkid3(Item.member_id);
  const beforeData = Object.keys(Item).map(data => {
    return { key: data, value: Item[data] };
  });

  if (user.menu_log === null || user.menu_log === undefined) {
    await blank_log_generate(Item.member_id, user);
  }
  await menu_log_generate(
    'item',
    Item.member_id,
    [],
    beforeData,
    'Item Deleted.'
  );
  res.status(200).json({
    status: true,
    id: Item.id
  });
});
exports.updateitem = (async (req, res, next) => {
  await menu.add_item_photo(req, next, res);
  const data = (req.body.data);
  const itemDetails = await menu.get_item(req.body.id);

  const beforeData = Object.keys(req.body).map(data => {
    return { key: data, value: itemDetails[req.body.data] };
  });
  let updatedItem = await menu.update_item(
    req.body.id,
    (req.body.data),
    req
  );
  const afterData = Object.keys(req.body).map(data => {
    return { key: data, value: req.body[data] };
  });

  const user = await auth.checkid3(updatedItem.member_id);

  if (user.menu_log === null || user.menu_log === undefined) {
    await blank_log_generate(updatedItem.member_id, user);
  }
  await menu_log_generate(
    'item',
    updatedItem.member_id,
    afterData,
    beforeData,
    'item updated.'
  );
  
  updatedItem = await menu.updated_item(data.id);

  res.status(200).json({
    status: true,
    updatedItem
  });
});

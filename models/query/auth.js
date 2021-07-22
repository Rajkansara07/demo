/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const mongoose = require('mongoose');
const Menu = require('../schema/menuModel');
const Category = require('../schema/categoryModel');
const Item = require('../schema/itemModel');

checkid: async memberId => {
    return new Promise(async (resolve, reject) => {
      await menu.findById(_id)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
},
{
checkid2: async memberId => {
    return new Promise(async (resolve, reject) => {
      await Category.findById(memberId)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
},

 checkid3: async (memberId) => {
  return new Promise(async (resolve, reject) => {
    await item.findById(memberId)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
}
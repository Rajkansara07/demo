const express = require('express');
const multer = require('multer');
const router = express.Router();

const menu = require('../controller/menuController');

router.route('/addmenu').post(menu.addmenu);
router.route('/viewmenu').get(menu.viewmenu);
router.route('/deletemenu/:id').delete(menu.deletemenu);
router.route('/updatemenu').patch(menu.updatemenu);

router.route('/addcategory').post(menu.addcategory);
router.route('/viewcategory').get(menu.viewcategory);
router.route('/deletecategory/:id').delete(menu.deletecategory);
router.route('/updatecategory').patch(menu.updatecategory);

router.route('/additem').post(menu.additem);
router.route('/getitem').get(menu.getitem);
router.route('/deleteitem/:id').delete(menu.deleteitem);
router.route('/updateitem').patch(menu.updateitem);
// router.route('/itemview').get(menu.itemview);

module.exports = router;

// /* eslint-disable node/no-unsupported-features/es-syntax */
// /* eslint-disable no-plusplus */
// //const aws = require('aws-sdk');
// //var sizeOf = require('image-size');

// const multer = require('multer');
// const fs = require('fs');

// //const multerS3 = require('multer-s3');

// //const AppError = require('../../utils/appError');

// // const s3 = new aws.S3({
// //   accessKeyId: process.env.AWS_ACCESS_KEY,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// // });
// function checkFileType(file, cb) {
//   // Allowed ext
//   // Check ext
//   if (
//     file.mimetype.split('/')[1] != 'jpeg' &&
//     file.mimetype.split('/')[1] != 'jpg' &&
//     file.mimetype.split('/')[1] != 'png' &&
//     file.mimetype.split('/')[1] != 'pdf'
//   ) {
//     cb(new AppError('wrong format file uploaded', 400));
//   } else {
//     return cb(null, true);
//   }
// }
// // const image = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: process.env.BUCKET,
// //     acl: 'public-read',
// //     key: function(req, file, cb) {
// //       // if (file.mimetype.startsWith('image')) {
// //       //   cb(null, true);
// //       // } else {
// //       //   cb(new AppError('Not an image ! upload only images ', 400), false);
// //       // }
// //       const d = new Date();

// //       // const dir = `${'public/img/partner/doc' +
// //       //   '/'}${d.getDate()}_${d.getUTCMonth()}_${d.getFullYear()}`;
// //       // if (!fs.existsSync(dir)) {
// //       //   fs.mkdirSync(dir);
// //       // }

// //       //const dir = 'hello';
// //       const name = `temp/${Date.now()}.${file.mimetype.split('/')[1]}`;
// //       cb(null, `${name}`);

// //       //console.log(`${file.name}`);
// //     }
// //   })
// // });

// // const doc = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: `${process.env.BUCKET}`,
// //     acl: 'public-read',
// //     key: function(req, file, cb) {
// //       const d = new Date();

// //       // const dir = `${'public/img/partner/doc' +
// //       //   '/'}${d.getDate()}_${d.getUTCMonth()}_${d.getFullYear()}`;
// //       // if (!fs.existsSync(dir)) {
// //       //   fs.mkdirSync(dir);
// //       // }

// //       //const dir = 'hello';
// //       file.name = `temp/${Date.now()}.${file.mimetype.split('/')[1]}`;
// //       cb(null, `${file.name}`);

// //       //console.log(`${file.name}`);
// //     }
// //   })
// // });
// // const itemPhoto = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: `${process.env.BUCKET}`,
// //     ContentType: 'image/jpeg',
// //     acl: 'public-read',
// //     key: function(req, file, cb) {
// //       const d = new Date();

// //       // const dir = `${'public/img/partner/doc' +
// //       //   '/'}${d.getDate()}_${d.getUTCMonth()}_${d.getFullYear()}`;
// //       // if (!fs.existsSync(dir)) {
// //       //   fs.mkdirSync(dir);
// //       // }

// //       //const dir = 'hello';
// //       const name = `temp/${Date.now()}.${file.mimetype.split('/')[1]}`;
// //       cb(null, `${name}`);

// //       //console.log(`${file.name}`);
// //     }
// //   }),
// //   fileFilter: function(_req, file, cb) {
// //     checkFileType(file, cb);
// //   }
// // });
// // const coverphoto = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: `${process.env.BUCKET}`,
// //     acl: 'public-read',

// //     key: function(req, file, cb) {
// //       const d = new Date();

// //       // const dir = `${'public/img/partner/doc' +
// //       //   '/'}${d.getDate()}_${d.getUTCMonth()}_${d.getFullYear()}`;
// //       // if (!fs.existsSync(dir)) {
// //       //   fs.mkdirSync(dir);
// //       // }

// //       //const dir = 'hello';
// //       const name = `temp/${Date.now()}.${file.mimetype.split('/')[1]}`;
// //       cb(null, `${name}`);

// //       //console.log(`${file.name}`);
// //     }
// //   })
// // });
// // exports.Base64ImageUpload = async function Base64ImageUpload(
// //   file,
// //   base64Data,
// //   ext
// // ) {
// //   return new Promise((resolve, reject) => {
// //     var date = new Date();
// //     var timestamp = date.getTime();
// //     const params = {
// //       Bucket: process.env.BUCKET,
// //       Key: file, // type is not required
// //       Body: base64Data,
// //       ACL: 'public-read',
// //       ContentEncoding: 'base64', // required
// //       ContentType: `image/${ext}` // required. Notice the back ticks
// //       // ContentType: `application/zip` // required. Notice the back ticks
// //     };
// //     s3.upload(params, async function(err, data) {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(data);
// //       }
// //     });
// //   });
// // };
// // exports.Base64ZipUpload = async function Base64ImageUpload(
// //   file,
// //   base64Data,
// //   ext
// // ) {
// //   return new Promise((resolve, reject) => {
// //     var date = new Date();
// //     var timestamp = date.getTime();
// //     const params = {
// //       Bucket: process.env.BUCKET,
// //       Key: file, // type is not required
// //       Body: base64Data,
// //       ACL: 'public-read',
// //       ContentEncoding: 'base64', // required
// //       // ContentType: `image/${ext}` // required. Notice the back ticks
// //       ContentType: `application/zip` // required. Notice the back ticks
// //     };
// //     s3.upload(params, async function(err, data) {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(data);
// //       }
// //     });
// //   });
// // };
// // exports.getImage = async function getImage(key) {
// //   const data = s3
// //     .getObject({
// //       Bucket: `${process.env.BUCKET}`,
// //       Key: key
// //     })
// //     .promise();
// //   return data;
// // };

// // const svgupload = multer({
// //   storage: multerS3({
// //     s3: s3,
// //     bucket: `${process.env.BUCKET}`,
// //     contentType: multerS3.AUTO_CONTENT_TYPE,
// //     acl: 'public-read',
// //     key: function(req, file, cb) {
// //       const d = new Date();

// //       // const dir = `${'public/img/partner/doc' +
// //       //   '/'}${d.getDate()}_${d.getUTCMonth()}_${d.getFullYear()}`;
// //       // if (!fs.existsSync(dir)) {
// //       //   fs.mkdirSync(dir);
// //       // }

// //       //const dir = 'hello';
// //       const name = `temp/${Date.now()}.svg`;
// //       cb(null, `${name}`);

// //       //console.log(`${file.name}`);
// //     }
// //   })
// // });
// // exports.movefile = async function movefiles3bucket(sourcefile, newpath) {
// //   return new Promise((resolve, reject) => {
// //     const params = {
// //       Bucket: process.env.BUCKET /* Another bucket working fine */,
// //       CopySource: `/${process.env.BUCKET}/${sourcefile}` /* required */,
// //       Key: newpath /* required */,
// //       ACL: 'public-read'
// //     };
// //     s3.copyObject(params, function(err, data) {
// //       if (err)
// //         //reject(err);
// //         console.log('err', err);
// //       // an error occurred
// //       else {
// //         resolve(data);
// //         //console.log(data); // successful response
// //       }
// //     });
// //   });
// // };

// // exports.urlimage = async function urlimageupload(
// //   dst,
// //   quality,
// //   imagesize,
// //   filename
// // ) {
// //   return new Promise((resolve, reject) => {
// //     const client = new Upload(process.env.BUCKETNAME, {
// //       aws: {
// //         path: dst,
// //         region: 'us-east-2',
// //         acl: 'public-read'
// //       },

// //       cleanup: {
// //         versions: true,
// //         original: false
// //       },

// //       original: {
// //         awsImageAcl: 'public-read'
// //       },
// //       versions: [
// //         {
// //           format: '',
// //           quality: quality
// //         }
// //       ]
// //     });
// //     client.upload(imagesize, {}, function(err, versions, meta) {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(versions);
// //       }
// //     });
// //   });
// // };

// // exports.imagedimension = async function imagedimension(url) {
// //   return new Promise(async (resolve, reject) => {
// //     // size(s3, process.env.BUCKET, url, function(err, dimensions, bytesRead) {
// //     //   resolve(dimensions);
// //     // });
// //     const data = s3.getObject(
// //       {
// //         Bucket: `${process.env.BUCKET}`,
// //         Key: url
// //       },
// //       function(err, data) {
// //         if (err) {
// //           reject(err);
// //         } else {
// //           const dimensions = sizeOf(data.Body);
// //           resolve(dimensions);
// //         }
// //       }
// //     );

// //     // console.log(data);
// //     // sizeOf(data.Body)
// //     //   .then(result => {
// //     //     resolve(result);
// //     //   })
// //     //   .catch(error => {
// //     //     reject(error);
// //     //   });

// //     // let result = await probe(url);
// //     // console.log(result);
// //     // resolve(result);
// //   });
// // };
// // exports.fileputs3 = async function(s3path, localimagepath) {
// //   return new Promise((resolve, reject) => {
// //     fs.readFile(localimagepath, function(err, data) {
// //       if (err) {
// //         throw err;
// //       }
// //       params = {
// //         Bucket: process.env.BUCKET,
// //         Key: s3path,
// //         Body: data,
// //         ACL: 'public-read'
// //       };
// //       s3.putObject(params, async function(err, data) {
// //         if (err) {
// //           reject(err);
// //         } else {
// //           resolve(data);
// //         }
// //       });
// //     });
// //   });
// // };
// // exports.fileputsBuffer = async function(s3path, data) {
// //   return new Promise((resolve, reject) => {
// //     const params = {
// //       Bucket: process.env.BUCKET,
// //       Key: s3path,
// //       Body: data,
// //       ACL: 'public-read'
// //     };
// //     s3.putObject(params, async function(err, data) {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(data);
// //       }
// //     });
// //   });
// // };
// // exports.deleteFile = async function(key) {
// //   return new Promise((resolve, reject) => {
// //     // fs.readFile(localimagepath, function(err, data) {
// //     //   if (err) {
// //     //     throw err;
// //     //   }
// //     const params = {
// //       Bucket: process.env.BUCKET,
// //       Key: key
// //       // Body: data,/
// //       // ACL: 'public-read'
// //     };
// //     s3.deleteObject(params, async function(err, data) {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         resolve(data);
// //       }
// //     });
// //   });
// //   // });
// // // };
// // exports.itemPhoto = itemPhoto.single('photo');
// // exports.categorypng = svgupload.single('photo');
// // exports.coverphotos = coverphoto.single('photo');
// // exports.customerphoto = itemPhoto.single('photo');
// // exports.categoryphoto = itemPhoto.array('photo', 10);
// // exports.reviewphoto = itemPhoto.array('photo', 10);

// // //module.exports = { urlimageupload };
// // exports.uploadUserPhoto = image.single('photo');
// // exports.mutipleimage = image.array('images', 30);
// // exports.documentImages = image.array('photo', 10);
// // exports.doc = image.array('doc_link', 10);

const Product = require('../models/product');
const _ = require('lodash');
const multer = require('multer');
const getErrorMessage = require('../helpers/errorHandler');

// upload product image
const  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //validation
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    }else{
    cb(null, Date.now() + '-' + file.originalname)
   }
  }
});
const upload = multer({ storage : storage, limits : {fileSize : 80000000} }).array('file',6);
exports.productImageUpload = (req,res) => {
  upload(req,res,(err) => {
    if(err){
      //
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.status(400).json({ message : 'File size is too large.'});
      }else if(err.code === 'filetype'){
         res.status(400).json({ message : 'Invalid file type'});
      }
    }else{
      const reqFiles = [];
      for(let i = 0; i < req.files.length; i++){
        reqFiles.push(req.files[i].filename)
      }
      res.json({ images : reqFiles })
    }
  });
}

//Add product
exports.createProduct = (req,res) => {
  const product = new Product(req.body);
  product.save((err,product) => {
     if(err){
       res.status(400).json({ error : getErrorMessage(err) })
     }
     res.status(200).json(product);
  })
}
// Product by id
exports.productById = (req,res,next,id) => {
  Product.findById(id)
   .exec((err,product) => {
     if(err || !product){
       return res.status(400).json({ error : 'Product not found'})
     }
     req.product = product;
     next();
   })
}
// Read signle product
exports.read = (req,res) => {
  return res.status(200).json(req.product);
}
// Remove
exports.remove = (req,res) => {
  let product = req.product;
  product.remove((err) => {
    if(err){
      return res.status(400).json({ error : getErrorMessage(err)})
    }
    res.status(200).json({ msg : 'Product deleted' })
  })
}
// Update
exports.update = (req,res) => {
   const { name, productImage, price, category, description, stock, quantity, sold } = req.body;
   const fields = {name,productImage,price,category,description,stock,quantity,sold};
   let product = req.product;
   product = _.extend(product,fields)
   product.save((err,product) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err)})
     }
     res.status(200).json(product);
   })
}

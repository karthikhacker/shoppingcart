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
        reqFiles.push(req.files[i].path)
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
  .populate('category','name')
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
// get products based on sell
exports.listBySell = (req,res) => {
  Product.find({})
   .sort('-sold')
   .limit(4)
   .exec((err,products) => {
      if(err || !products){
        return res.status(400).json({ error : 'No products' })
      }
      res.status(200).json(products);
   })
}
//get product based on arrival
exports.listLatest = (req,res) => {
  Product.find({})
   .sort('-createdAt')
   .limit(4)
   .exec((err,products) => {
      if(err || !products){
        return res.status(400).json({ error : 'No products'})
      }
      res.status(200).json(products);
   })
}
// list related
exports.listRelated = (req,res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find({ _id : {$ne : req.product}, category : req.product.category })
   .limit(limit)
   .populate('category','_id, name')
   .exec((err,product) => {
      if(err){
        return res.status(400).json({ error : getErrorMessage(err)})
      }
      res.status(200).json(product);
   })
}
//List by search
exports.listBySearch = (req,res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  let term = req.body.searchTerm;
  //console.log(req.body.filters);
  for(let key in req.body.filters){
     if(req.body.filters[key].length > 0){
       if(key === 'price'){
         findArgs[key] = {
           $gte : req.body.filters[key][0],
           $lte : req.body.filters[key][1]
         }
       }else{
         findArgs[key] = req.body.filters[key];
       }
     }
  }
  //console.log(findArgs)
   Product.find(findArgs)
     .populate('category')
     .sort([[ sortBy, order ]])
     .skip(skip)
     .limit(limit)
     .exec((err,product) => {
       if(err){
         return res.status(400).json({ error : getErrorMessage(err) })
       }
       res.status(200).json({ size : product.length, product});
     })


}
exports.productList = (req,res) => {
  Product.find()
   .exec((err,products) => {
     if(err){
       res.status(400).json({ error : 'Product not found'})
     }
     res.status(200).json(products);
   })
}

//Product update

exports.update = (req,res) => {
      const id = { _id : req.params.productId}
      const data = {
        name : req.body.name,
        price : req.body.price,
        productImage : req.body.productImage,
        category : req.body.category,
        description : req.body.description,
        sold : req.body.sold,
        quantity : req.body.quantity
      }
      Product.findOneAndUpdate(id,data,(err) => {
         if(err){
           return res.status(400).json({ err : 'Error updating'})
         }
         res.status(200).json({ message : 'UPDATED'})
      })
    }


// Remove product
exports.remove = (req,res) => {
  let product = req.product;
  product.remove((err) => {
     if(err){
       return res.status(400).json({ error :  getErrorMessage(err)})
     }
     res.status(200).json({ message : 'DELETED' })
  })
}

// categoryByProduct
exports.categoryByProduct = (req,res) => {
  Product.find({ category : req.params.categoryId})
   .then((products) => {
      if(products.length < 1){
        return res.status(400).json({ message : 'No products'})
      }
      res.status(200).json(products)
   })
}

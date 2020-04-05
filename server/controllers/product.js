const Product = require('../models/product');
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

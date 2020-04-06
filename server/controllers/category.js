const Category = require('../models/category');
const _ = require('lodash');
const getErrorMessage = require('../helpers/errorHandler');
//create
exports.create = (req,res) => {
  const category = new Category(req.body);
  category.save((err,category) => {
    if(err){
      return res.status(400).json({ error : getErrorMessage(err)})
    }
    res.status(200).json(category);
  })
}
//get categories
exports.categories = (req,res) => {
  Category.find({})
   .exec((err,categories) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err) })
     }
     res.status(200).json(categories);
   })
}
// cateory by id
exports.categoryById = (req,res,next,id) => {
  Category.findById(id).exec((err,category) => {
     if(err || !category){
       return res.status(400).json({ error : ' category not found '})
     }
     req.category  = category;
     next();
  })
}
// Read
exports.read = (req,res) => {
   return res.json(req.category)
}
// update
exports.update = (req,res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err,category) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err)});
     }
     res.status(200).json(category);
  })
}
// remove
exports.remove = (req,res) => {
  const category  = req.category;
  category.remove((err) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err) });
     }
     res.status(200).json({ message : 'Category removed.'})
  })
}

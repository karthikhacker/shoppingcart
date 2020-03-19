const Category = require('../models/category');
const getErrorMessage = require('../helpers/errorHandler');

// create category
exports.create = (req,res) => {
  const category = new Category(req.body);
  category.save((err,category) => {
     if(err){
       return res.status(400).json({ error : getErrorMessage(err) })
     }
     res.status(200).json(category);
  })
}

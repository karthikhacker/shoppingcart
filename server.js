const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const path = require("path");
const app = express();
const config = require('./server/config/db');
//Routes
 const userRoutes = require('./server/routes/user');
 const braintreeRoutes = require('./server/routes/braintree');
 const categoryRoutes = require('./server/routes/category');
 const productRoutes = require('./server/routes/product');
 const orderRoutes = require('./server/routes/order');

//mongodb connection
mongoose.connect(config.MONGOURI,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true
}).then(() => {
   console.log(chalk.yellow('MONGODB CONNECTED !'))
})

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended  : true }));
app.use(morgan('dev'));
require('./server/middlewares/passport')(passport);

//Routes Middleware
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',braintreeRoutes);

app.use('/uploads',express.static('uploads'));

//serve static files in production
if(process.env.NODE_ENV === 'production'){
   app.use(express.static('frontend/build'))
   app.get("*",(req,res) => {
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
   })
}

//server
const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(chalk.white(`App running at port  ${port}` ));
})

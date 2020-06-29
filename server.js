const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const app = express();
require('dotenv').config();

//Routes
 const userRoutes = require('./server/routes/user');
 const braintreeRoutes = require('./server/routes/braintree');
 const categoryRoutes = require('./server/routes/category');
 const productRoutes = require('./server/routes/product');
 const orderRoutes = require('./server/routes/order');

//mongodb connection
mongoose.connect(process.env.MONGOURI,{
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

//server
const port = process.env.PORT;
app.listen(port, () => {
   console.log(chalk.white(`App running at port  ${port}` ));
})

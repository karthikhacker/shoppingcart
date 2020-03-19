const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const app = express();
require('dotenv').config();

//Routes
 const userRoutes = require('./server/routes/user');

//mongodb connection
mongoose.connect(process.env.MONGOURI,{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(() => {
   console.log(chalk.yellow('MONGODB CONNECTED !'))
})

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended  : true }));
app.use(morgan('dev'));
app.use(cors());

//Routes Middleware
app.use('/api',userRoutes);

//server
const port = process.env.PORT;
app.listen(port, () => {
   console.log(chalk.white(`App running at port  ${port}` ));
})

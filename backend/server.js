const express=require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser =require("body-parser");
multer = require('multer');
const path = require('path');
const passport = require('passport');




require('dotenv/config');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}

const cors=require('cors');
// CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));
app.use(express.static('.'));

const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    console.log(JSON.stringify(file));
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
});

app.post('/file-upload', upload.single('image'), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
  
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
  });


app.use(bodyparser.json());
const productsRoute= require('./routes/products');
const categoriesRoute= require('./routes/categories');
const colorsRoute= require('./routes/colors');
const providersRoute= require('./routes/providers');
const usersRoute= require('./routes/users');



app.use('/products',productsRoute)
app.use('/colors',colorsRoute)
app.use('/categories',categoriesRoute)
app.use('/providers',providersRoute)
app.use('/users',usersRoute)
 
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true, useUnifiedTopology: true},
()=>{
    console.log('connected to Database');
});

require('./config/passport')(passport);

app.listen(3000);
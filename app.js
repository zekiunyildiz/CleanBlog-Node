const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

const app = express();

//!Connect DB
mongoose.connect('mongodb://localhost/clean-blog', {
  useNewUrlParser: true,
  useUnifiedTopology:true,
});


// !Template Engine
app.set('view engine', 'ejs');


//! Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//!INDEX
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  const photos = await Photo.find({})
  res.render('index', {
    photos:photos
  });
});


app.get('/photos/:id', async(req, res) => {
  const post = await Photo.findById(req.params.id)
  res.render('post', {
    post
  });
});


//!ABOUT
app.get('/about', (req, res) => {
  res.render('about');
});

//!ADD PHOTO
app.get('/add', (req, res) => {
  res.render('add');
});


//! POST
app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/')
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

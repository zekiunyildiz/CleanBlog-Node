const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const methodOverride = require('method-override');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const app = express();

//!Connect DB
mongoose.connect('mongodb://localhost/clean-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// !Template Engine
app.set('view engine', 'ejs');

//! Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//!INDEX
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos: photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const post = await Photo.findById(req.params.id);
  res.render('post', {
    post,
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
  //console.log(req.files.image);
  //await Photo.create(req.body)
  //res.redirect('/')

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`)
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

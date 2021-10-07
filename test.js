const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//! connect DB
mongoose.connect('mongodb://localhost/clean-blog-db');

//! create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//! create a photo
/* Photo.create({
  title: 'Photo Title 2',
  description: 'Photo description 2 lorem',
}); */

//! read a photo

/* Photo.find({}, (err, data) =>{
    console.log(data);
}) */

//! update photo
/* const id = '615e24f128bad4d11fbf0905';

Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo Title 112 updated',
    description: 'Photo description 112 updated',
  },
  {
      new: true
  },
  (err, data) => {
    console.log(data);
  }
);
 */

//! delete a photo

const id = '615e24f128bad4d11fbf0905';

Photo.findByIdAndDelete(id, (err,data)=>{
    console.log('Photo is removed... ');
})
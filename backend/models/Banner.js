// backend/models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: String,
  link: String,
  subheadline: String,
  image: String,
  video: String,
  poster: String,
  type: {
    type: String,
    enum: ["video", "carousel"],
    required: true,
    default: "carousel"
  }
});


module.exports = mongoose.model('Banner', bannerSchema);

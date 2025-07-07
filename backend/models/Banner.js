const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  image: { type: String },      // for image banners (optional)
  video: { type: String },      // for video banners (optional)
  poster: { type: String },     // for video poster (optional)
  link: { type: String },
  title: { type: String },      // use title instead of 'text' for overlay
  subheadline: { type: String } // optional: for subtitle/extra overlay text
});

module.exports = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

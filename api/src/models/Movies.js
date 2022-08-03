const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    img_title: { type: String },
    img_sm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    is_series: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Movie', MovieSchema);

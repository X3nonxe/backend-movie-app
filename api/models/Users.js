const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_pictures: { type: String, default: ' ' },
  is_admin: { type: Boolean, default: false },
  last_login: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

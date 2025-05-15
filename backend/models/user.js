// models/user.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true } // hashed with bcrypt
}, {
  versionKey: false
});

export default mongoose.model('User', UserSchema);

// models/session.js
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // references User.email
  jwtToken: { type: String, required: true }
}, {
  versionKey: false
});

export default mongoose.model('Session', SessionSchema);

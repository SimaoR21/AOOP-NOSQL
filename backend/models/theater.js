// models/theater.js
import mongoose from 'mongoose';

const TheaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    geo: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: arr => arr.length === 2,
          message: 'Coordinates must be an array of two numbers: [longitude, latitude]'
        }
      },
    },
  },
}, {
  versionKey: false
});

// Create geospatial index on location.geo
TheaterSchema.index({ 'location.geo': '2dsphere' });

export default mongoose.model('Theater', TheaterSchema);

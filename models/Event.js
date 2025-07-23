const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true }
});

module.exports = mongoose.model('Event', EventSchema);

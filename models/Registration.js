const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user: { type: String, required: true }, // peut être email ou nom
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Registration', RegistrationSchema);

const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event);
    if (!event) return res.status(404).json({ message: 'Événement non trouvé' });

    const existing = await Registration.findOne({
      user: req.body.user,
      event: req.body.event
    });

    if (existing) {
      return res.status(400).json({ message: 'Déjà inscrit à cet événement' });
    }

    const count = await Registration.countDocuments({
      event: req.body.event,
      status: 'confirmed'
    });

    if (count >= event.capacity) {
      return res.status(400).json({ message: 'Capacité maximale atteinte' });
    }

    const registration = new Registration({
      user: req.body.user,
      event: req.body.event
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ Connexion MongoDB échouée :', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

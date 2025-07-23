require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const chalk = require('chalk'); // Pour les couleurs dans la console
const figlet = require('figlet'); // Pour l'ASCII art

const app = express();

// Configuration des logs stylisés
const successLog = (text) => console.log(chalk.green.bold(`✓ ${text}`));
const errorLog = (text) => console.log(chalk.red.bold(`✗ ${text}`));
const infoLog = (text) => console.log(chalk.blue.bold(`ℹ ${text}`));

// Connexion MongoDB avec message stylisé
connectDB()
  .then(() => successLog('Connecté à MongoDB'))
  .catch(err => errorLog(`Erreur MongoDB: ${err.message}`));

// Middleware
app.use(cors());
app.use(express.json());

// Route d'accueil stylisée
app.get('/', (req, res) => {
  const welcomeMessage = {
    message: "Bienvenue dans l'API EventApp",
    endpoints: {
      events: "/api/events",
      registrations: "/api/registrations"
    },
    status: "running"
  };
  res.json(welcomeMessage);
});

// Routes
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

// Lancer le serveur avec un beau message
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.clear();
  figlet.text('EventApp', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, (err, data) => {
    if (err) {
      console.log(chalk.yellow.bold("\nEventApp API"));
    } else {
      console.log(chalk.cyan.bold(data));
    }
    
    const divider = chalk.gray('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯');
    
    console.log(`
${divider}
${chalk.green.bold('✅ Serveur opérationnel')}
${chalk.white.bold(`Port: ${chalk.yellow(PORT)}`)}
${chalk.white.bold(`Environnement: ${chalk.yellow(process.env.NODE_ENV || 'development')}`)}
${chalk.blue.bold(`URL: http://localhost:${PORT}`)}
${divider}
    `);
  });
});
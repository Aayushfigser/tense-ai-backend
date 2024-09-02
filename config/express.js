const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const setupExpress = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

module.exports = setupExpress;

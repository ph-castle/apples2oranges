require('dotenv').config();
const express = require('express');
const router = require('./routes/routes.js');

const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

module.exports = app;
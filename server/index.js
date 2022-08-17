<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const router = require("./routes/routes.js");
const spotifyRouter = require("./routes/spotifyRouter.js");
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
>>>>>>> 58cf2cdfa88671bc2e5b0040121a3e9cd80d0b3f

const port = process.env.REACT_APP_SERVER_PORT || 5050;

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

// increases data limit for pictures
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);

app.use(express.json());

app.use("/", router);
app.use("/spotify", spotifyRouter);

app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

module.exports = app;

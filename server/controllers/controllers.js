const models = require("../models/models.js");
const cloudinary = require("./cloudinary.js");

// returns userId, username, avatar or empty
module.exports.validateUser = (req, res) => {
  const { username, password } = req.query;

  models
    .readUser(username, password)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("Problem validating user: ", err);
      res.status(500).send(err);
    });
};

// returns id of username if it exists
module.exports.getUsername = (req, res) => {
  const username = req.params.username;
  models
    .readUsername(username)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("Error getting username: ", err);
      res.status(500).send(err);
    });
};

// adds new user and returns user info
module.exports.addNewUser = (req, res) => {
  const { username, password, avatar } = req.body;

  if (username === undefined || password === undefined) {
    res.status(400).send("Undefined input");
  } else {
    models
      .addUser(username, password, avatar)
      .then((result) => {
        res.status(202).send(result);
      })
      .catch((err) => {
        console.log("Problem creating user: ", err);
        res.status(500).send(err);
      });
  }
};

// updates user's username, password, and avatar
module.exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { username, password, avatar } = req.body;

  models
    .putUser(userId, username, password, avatar)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Problem updating user: ", err);
      res.status(500).send(err);
    });
};

module.exports.getUserCards = (req, res) => {
  const { userId } = req.params;
  const { NSFW } = req.query;

  models
    .readUserCards(userId, NSFW)
    .then((result) => {
      console.log(result);
      if (result === undefined) {
        res.status(200).send("No User Cards");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      console.log("Problem retrieving user cards: ", err);
      res.status(500).send(err);
    });
};

module.exports.addUserCards = (req, res) => {
  const { userId } = req.params;
  const { NSFW } = req.query;
  const cards = req.body.cards.split("\n");
  const userCards = cards.map((card) => [card, userId, NSFW]);

  models
    .putUserCards(userId, userCards)
    .then(() => {
      res.status(201).send("201 CREATED");
    })
    .catch((err) => {
      console.log("Problem adding user cards: ", err);
      res.status(500).send(err);
    });
};

module.exports.getPromptCards = (req, res) => {
  const { NSFW } = req.query;
  models
    .readPromptCards(NSFW)
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log("Problem retrieving prompt cards: ", err);
      res.status(500).send(err);
    });
};

module.exports.getAnswerCards = (req, res) => {
  const { NSFW } = req.query;
  models
    .readAnswerCards(NSFW)
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log("Problem retrieving answer cards: ", err);
      res.status(500).send(err);
    });
};

// uploads image to cloudinary and returns url
module.exports.postAvatar = (req, res) => {
  cloudinary
    .uploadImage(req.body.img, function (error, result) {
      console.log(result, error);
    })
    .then((results) => {
      res.status(201).send(results.url);
    })
    .catch((err) => {
      console.log("Error uploading image to cloudinary: ", err);
      res.status(500).send(err);
    });
};

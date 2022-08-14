const models = require('../models/models.js');
const cloudinary = require('./cloudinary.js');

// returns userId, username, avatar or empty
module.exports.validateUser = (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  models.readUser(username, password)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('Problem validating user: ', err);
      res.status(500).send(err);
    });
};

// returns id of username if it exists
module.exports.getUsername = (req, res) => {
  let username = req.params.username;
  models.readUsername(username)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('Error getting username: ', err);
      res.status(500).send(err);
    });
};

// adds new user and returns user info
module.exports.addNewUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let avatar = req.body.avatar;

  if (username === undefined || password === undefined) {
    res.status(400).send('Undefined input');
  } else {
    models.addUser(username, password, avatar)
      .then((result) => {
        res.status(202).send(result);
      })
      .catch((err) => {
        console.log('Problem creating user: ', err);
        res.status(500).send(err);
      });
  }
};

// updates user's username, password, and avatar
module.exports.updateUser = (req, res) => {
  let userId = req.params.userId;
  let username = req.body.username;
  let password = req.body.password;
  let avatar = req.body.avatar;
  models.putUser(userId, username, password, avatar)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Problem updating user: ', err);
      res.status(500).send(err);
    });
};

module.exports.getUserCards = (req, res) => {
  let userId = req.params.userId;

  models.readUserCards(userId)
    .then((result) => {
      if (result.length === 0) {
        res.status(200).send('No User Cards')
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      console.log('Problem retrieving user cards: ', err);
      res.status(500).send(err);
    })
};

module.exports.addUserCards = (req, res) => {
  let userId = req.params.userId;
  let cards = req.params.cards.split('\n');
  let userCards = cards.map((card) => [card, userId]);

  models.putUserCards(userId, userCards)
    .then(() => {
      res.status(201).send('201 CREATED');
    })
    .catch((err) => {
      console.log('Problem adding user cards: ', err);
      res.status(500).send(err);
    })
};

module.exports.getPromptCards = (req, res) => {

  models.readPromptCards()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('Problem retrieving prompt cards: ', err);
      res.status(500).send(err);
    })
};

module.exports.getAnswerCards = (req, res) => {

  models.readAnswerCards()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log('Problem retrieving answer cards: ', err);
      res.status(500).send(err);
    })
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
      console.log('Error uploading image to cloudinary: ', err);
      res.status(500).send(err);
    });
}
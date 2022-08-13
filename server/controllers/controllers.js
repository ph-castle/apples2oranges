const models = require('../models/models.js');

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

// add new user, return userId
module.exports.addNewUser = (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let avatar = req.query.avatar;

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
  let username = req.query.username;
  let password = req.query.password;
  let avatar = req.query.avatar;
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
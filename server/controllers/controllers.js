const models = require('../models/models.js');

// returns userId, username, avatar or empty
module.exports.validateUser = (req, res) => {
  const { username, password } = req.query;

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
  const { username, password, avatar } = req.query;

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
  const { userId } = req.params;
  const { username, password, avatar } = req.query;

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
  const { userId } = req.params;
  const { NSFW } = req.query;

  models.readUserCards(userId, NSFW)
    .then((result) => {
      console.log(result);
      if (result === undefined) {
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
  const { userId } = req.params;
  const { NSFW } = req.query;
  const cards = req.body.cards.split('\n');
  const userCards = cards.map((card) => [card, userId, NSFW]);

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
  const { NSFW } = req.query;
  models.readPromptCards(NSFW)
    .then(({rows}) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log('Problem retrieving prompt cards: ', err);
      res.status(500).send(err);
    })
};

module.exports.getAnswerCards = (req, res) => {
  const { NSFW } = req.query;
  models.readAnswerCards(NSFW)
    .then(({rows}) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log('Problem retrieving answer cards: ', err);
      res.status(500).send(err);
    })
};
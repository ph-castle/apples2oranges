const router = require('express').Router();
const controllers = require('../controllers/controllers.js');

router.get('/user', controllers.validateUser);

router.post('/user', controllers.addNewUser);

router.put('/user/:userId', controllers.updateUser);

router.get('/cards/:userId', controllers.getUserCards);

router.put('/cards/:userId', controllers.addUserCards);

router.get('/cards/prompt', controllers.getPromptCards);

router.get('/cards/answer', controllers.getAnswerCards);

module.exports = router;
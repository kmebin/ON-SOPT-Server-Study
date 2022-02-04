const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.readAll);
router.get('/:userId', userController.read);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;

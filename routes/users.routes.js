const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const UsersController = require('../controllers/users.controller');

router.get('/', authMiddleware, UsersController.getUser);

module.exports = router;

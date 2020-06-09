let path = require('path');
let express = require('express');
let authRouter = express.Router();
const authController = require('../config/authorisation/auth');

authRouter.post('/login', authController.login );



module.exports = authRouter;
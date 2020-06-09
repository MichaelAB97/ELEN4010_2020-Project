let path = require('path');
let express = require('express');
let router = express.Router();
const authController = require('../config/authorisation/auth');

router.post('/login', authController.login );



module.exports = router;
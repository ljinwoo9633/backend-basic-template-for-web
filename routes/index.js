require('dotenv').config();

let express = require('express');
let router = express.Router();

let RegisterController = require('./Controllers/User/Register');
let LoginController = require('./Controllers/User/Login');
let LogoutController = require('./Controllers/User/Logout');
let ConfirmController = require('./Controllers/User/Confirm');

let {
    VerifyAccessTokenMiddleware,
    VerifyEmailTokenMiddleware
} = require('./Middlewares/Verify');

let {
    CheckUserAuthorizationController
} = require('./Controllers/Check/Check');

router.post('/login', LoginController);

router.post('/register', RegisterController);

router.post('/logout', VerifyAccessTokenMiddleware, LogoutController);

router.get('/confirm/:id', VerifyEmailTokenMiddleware, ConfirmController);

//Check Routes
router.post('/check/user/auth/:id', CheckUserAuthorizationController);

module.exports = router;
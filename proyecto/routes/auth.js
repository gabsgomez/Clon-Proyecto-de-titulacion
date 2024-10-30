const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verifyCode);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/verify-reset-code', authController.verifyResetCode);
router.post('/reset-password', authController.resetPassword);




router.post('/latest-user-type', authController.getLatestUserType);


//solo en lo q pruebo lo nuevo
//router.post('/upload', authController.uploadFiles);





module.exports = router;

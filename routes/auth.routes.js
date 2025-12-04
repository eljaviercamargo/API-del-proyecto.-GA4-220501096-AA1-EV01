const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authCtrl.registerPaciente);
router.post('/login', authCtrl.loginPaciente);

router.get('/me', authMiddleware, authCtrl.me);

module.exports = router;

const express = require('express');
const router = express.Router();

router.use('/user', require('./user-routes'))
router.use('/room', require('./room-routes'))
router.use('/stream', require('./stream-routes'))






module.exports = router
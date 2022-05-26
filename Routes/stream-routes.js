const express = require('express');
const router = express.Router();
const streamController = require('../Controllers/stream-controller');
const { Auth, isAdmin } = require('../Middleware/auth');

    router.post('/addStream', streamController.addStream),
    router.get('/getStream',  streamController.getStream),
    router.get('/deleteStream', streamController.deleteLigne),

 
    module.exports = router
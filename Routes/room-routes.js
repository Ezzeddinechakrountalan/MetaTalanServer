const express = require('express');
const router = express.Router();
const RoomController = require('../Controllers/room-controller');
const { Auth, isAdmin } = require('../Middleware/auth');

    router.post('/addRoom', RoomController.addRoom),
    router.get('/getAll',  RoomController.getAllRoom),
 
    module.exports = router
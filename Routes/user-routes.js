const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user-controller');
const { Auth, isAdmin } = require('../Middleware/auth');

    router.post('/register', UserController.Register),
    router.post('/newAdmin', [Auth, isAdmin], UserController.NewAdmin),


    router.post('/login', UserController.Login),
    router.post('/logout', UserController.Logout),


    
    router.get('/getAll',  UserController.getAll),
    router.post('/getAvatarUrl', UserController.getAvatarUrl),  
    router.post('/setAvatarUrl', UserController.setAvatarUrl), 
    module.exports = router
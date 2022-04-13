

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Room = require('../Models/Room');


const addRoom = async (req, res) => {
    const { name, photonID, users} = req.body;
    try {
      
        room = new Room({
            name, photonID, users
        })
       
        //save room in database
        await room.save();
        res.status(201).json({ msg: "room created successfully" })
    } catch (error) {

        res.status(500).send('Server error');

    }
}


const getAllRoom = async (req, res) => {
    Room.find()
        .then(rooms => {
            res.json({ rooms })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    addRoom,
    getAllRoom
  
}
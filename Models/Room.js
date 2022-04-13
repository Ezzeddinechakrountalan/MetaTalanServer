
const mongoose = require('mongoose');
const User = require('../Models/User');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    photonID: {
        type: String,

    }

},
{ versionKey: false }


)
module.exports = Room = mongoose.model('rooms', RoomSchema);

/*

users:
[{mongoose.schema.types.object id , ref :'User'}]
friends: [{type: ObjectId, ref: 'User'}]
friends: [{type: Mongoose.Schema.Types.ObjectId, ref: 'User'}]

,
    users: [{
        Type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
*/
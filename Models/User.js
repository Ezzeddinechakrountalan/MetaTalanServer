const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    avatarURL: {
        type: String,

    },
    networkID: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    } ,
    role: {
        type: String,
        required: true,

    },

},
{ versionKey: false }

)
module.exports = User = mongoose.model('users', UserSchema);


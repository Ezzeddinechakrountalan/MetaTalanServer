const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    uid: {
        type: String,

    },
    channelName :{
        type:String
    },
    isLive:{
        type: Boolean,
        default:false
        
    },
    

},
{ 
    versionKey: false
})
module.exports = Stream = mongoose.model('streams', streamSchema);


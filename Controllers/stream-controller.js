

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Stream = require('../Models/Stream');


const addStream = async (req, res) => {
    const { uid,channelName,isLive} = req.body;
    try {
      let ss = await Stream.findOne({ uid });
      if(ss){
          
        ss.channelName=channelName;
        await ss.save();
        res.status(201).json({ msg: "chanel name updated" })
      }else{
        const   stream = new Stream({
            uid,channelName,isLive
         })
        
         //save stream in database
         await stream.save();
         res.status(201).json({ msg: "stream created successfully" })
      }
   
    } catch (error) {

        res.status(500).send('Server error');

    }
}
/*  if exist : return stream  else : return nnotFound */

const getStream = async (req, res) => {
   const {channelName} = req.body;
    Stream.find({ channelName })
        .then(stream => {
            res.json( {stream} )
        })
        .catch(err => {
            console.log(err);
        })
}
const deleteLigne= async (req,res)=>{
    var myquery = { isLive: true };
    Stream.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json("1 document deleted");
      });
}

module.exports = {
    addStream,
    getStream,
    deleteLigne
  
}
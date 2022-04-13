const mongoose = require('mongoose')


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const url = 'mongodb+srv://talan:talan123@mycluster.mr0yk.mongodb.net/meta_talan?retryWrites=true&w=majority';
const connectDB = async () => {
    
    mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

}

module.exports = connectDB


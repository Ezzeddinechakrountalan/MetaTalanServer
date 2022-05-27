const co = async () => {




    try{

        const express = require('express');

        //morgan for developpement give info about each request

        const morgan = require('morgan');

        const cors = require('cors');

        const bodyParser = require('body-parser');

       

        const app = express();

        require('dotenv').config({

            path: './Config/index.env'

        });

       

        const connectDB = require('./Config/db');

       

        connectDB()

        app.use(bodyParser.json());

        app.use(morgan('dev'))

        app.use(cors())

       

        app.use('/api', require('./Routes/index-routes'));

       

        app.get('/', (req, res) => {

            res.send('app running successfully');

        });

        const PORT = process.env.PORT

        app.listen(PORT, () => {

            console.log(`app listening on port ${PORT}!`);

        });

    }catch(err){

        co();

    }

}






 co();
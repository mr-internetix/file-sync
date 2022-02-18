const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')});

// require('dotenv').config();





function connectDB(){
    
// database connection 
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:false});
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected');
    }).on('error', function (err) {
        console.log(err);
      });


}

// connectDB();

module.exports = connectDB;


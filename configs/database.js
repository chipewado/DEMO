const mongoose = require('mongoose');


async function connectDB(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/accounts_db');
        console.log('Connected to MongoDB');
    }  catch(error){
        console.error('Error connecting to MongoDB:', error.message);
    }
}
module.exports = connectDB;
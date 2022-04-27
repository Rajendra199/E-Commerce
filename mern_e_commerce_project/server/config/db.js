const mongoose = require('mongoose');
const {MONGO_URL} = require('./envConfig');

const connect = async () => {
    try{
        const response = await mongoose.connect(MONGO_URL);
        if(response){
            console.log('Database connected...!!!');
        }
    }catch(err){
        console.log("Database not connected");
    }
}

module.exports = connect;
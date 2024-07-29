const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/'; //establishing connection to mongodb compass server on loacl machine

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connection established");
};

// Export the function
module.exports = connectToMongo;

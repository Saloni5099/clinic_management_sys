const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To DB");
    } catch (error) {
        console.error('Error Connecting To DB '+error);
    }
}

module.exports = {connectDB}

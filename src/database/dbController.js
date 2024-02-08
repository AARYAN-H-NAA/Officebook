const Mongoose = require('mongoose')

const connectDB = async () => {
    try {await Mongoose.connect(
        "mongodb://localhost:27017/Aaryan"
    )
    console.log("MongoDB Connected")}
    catch{
        console.error("This is a monogodb connection",error);
    }
  }
  module.exports = connectDB
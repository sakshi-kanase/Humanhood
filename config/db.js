// const mongoose = require("mongoose")

// const connectDB = async() =>{
//     try{
//         await mongoose.connect("mongodb://127.0.0.1:27017/humanhood");
//         console.log("mongoDB connected successfully");
//     }catch(error){
//         console.log("mongodb connection failed:",error.message);
//         process.exit(1);
//     }
// };



// module.exports = connectDB

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("mongodb connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
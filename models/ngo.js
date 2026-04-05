const mongoose = require("mongoose");
const ngoSchema = new mongoose.Schema({
    name: String,
    location: String,
    phone:String,
    addressLink: String,
    needs:[String],
    description:String
});

module.exports = mongoose.model("NGO",ngoSchema);
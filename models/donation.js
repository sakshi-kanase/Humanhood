const { name } = require("ejs");
const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    donationType:{
        type:String,
        required:true,
        enum:["Money","Clothes","Food","Other"]
    },
    amount:{
        type:Number
    },
    description: {
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Received","Delivered"],
        default:"Pending"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Donation",donationSchema);
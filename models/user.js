const { resolveInclude } = require("ejs")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim:true
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type:String,
            enum:["volunteer","senior","donor"],
        }
    },
    // {
    //     timestamps:true
    // }
);

module.exports = mongoose.model("User",userSchema);
const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
const feedbackSchema = new moongoose.Schema({
    role:{
        type:String,
        required:true,
        enum:["Volunteer","SeniorCitizen","Donor"]
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    rating:{
        type:String
    },
    experience:{
        type:String,
        required:true
    },
    interactionDetails:{
        type:String
    },
    visitAgain:{
        type:Boolean
    },
    // donationType:{
    //     type:String
    // }
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Feedback",feedbackSchema);
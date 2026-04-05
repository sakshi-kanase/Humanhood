const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({

    volunteerName: String,
    volunteerEmail: String,
    seniorName:String,
    seniorEmail: String,
    visitDate: Date,
    visitTime: String,
    activity: String,
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Visit", visitSchema);
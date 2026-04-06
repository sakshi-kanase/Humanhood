require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const NGO = require("../models/ngo");
const data = require("./data")

async function seedDB() {
    await connectDB();
    await NGO.deleteMany({});
    await NGO.insertMany(data);
    console.log("NGO data inserted successfully");
    process.exit();
}
seedDB();

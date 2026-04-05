const express = require("express");
const router = express.Router();
const Gallery = require("../models/gallery");

router.get("/gallery",async(req,res)=>{
    const images = await Gallery.find({});
    res.render("pages/gallery",{images});
});

module.exports = router;
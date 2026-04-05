const express = require("express");
const router = express.Router();
const NGO = require("../models/ngo")

router.get("/references", async (req, res) => {
    const search = req.query.search || "";
    const location = req.query.location || "";

    let query = {};
    if (search) {
        query.name = { $regex: search, $options: "i" };
    }
    if (location) {
        query.location = { $regex: location, $options: "i" };
    }
    const ngos = await NGO.find(query);
    res.render("pages/reference", { ngos });
});

router.get("/ngo/:id", async (req, res) => {
    const ngo = await NGO.findById(req.params.id);
    res.render("pages/ngoDetails", { ngo });
});

module.exports = router

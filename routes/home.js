const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {

    try {

        // Count Volunteers
        const volunteerCount =
            await User.countDocuments({
                role: "volunteer"
            });

        // Count Seniors
        const seniorCount =
            await User.countDocuments({
                role: "senior"
            });

        // Count Donors
        const donorCount =
            await User.countDocuments({
                role: "donor"
            });

        // Send Data to EJS
        res.render("pages/home", {
            volunteerCount,
            seniorCount,
            donorCount
        });

    } catch (error) {

        console.log(error);

        res.send("Server Error");

    }

});

module.exports = router;
const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");


router.get("/donation", (req, res) => {
    res.render("pages/donation");
});

router.get("/my-donations", async (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const donations = await Donation.find({
        email: req.session.user.email
    }).sort({ date: -1 });

    const totalDonations = donations.length;

    const totalMoney = donations
        .filter(d => d.amount)
        .reduce((sum, d) => sum + d.amount, 0);

    const itemsDonated = donations
        .filter(d => d.donationType !== "Money").length;

    res.render("Donation/my-donations", {
        donations,
        totalDonations,
        totalMoney,
        itemsDonated
    });

});
router.get("/donation-success", (req, res) => {
    res.render("Donation/donation-success");
});

router.post("/donation", async (req, res) => {
    try {
        const { name, email, donationType, amount, description } = req.body;
        if (!name || !email || !donationType) {
            return res.send("All required fileds must be filled");
        }
        if (donationType === "Money" && !amount) {
            return res.send("please enter donation amount");
        }
        if (donationType !== "Money" && !description) {
            return res.send("please describe the donated items");
        }
        await Donation.create({
            name,
            email,
            donationType,
            amount,
            description
        });
        req.flash("success_msg", "Donation Successful | Thank you for helping!");
        res.redirect("/donation-success");

    } catch (error) {
        console.error(error);
        req.flash("error_msg","Donation Failed");
        res.redirect("/");
    }
    console.log(req.body)
});

module.exports = router;
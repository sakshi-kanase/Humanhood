const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const Visit = require("../models/visit");
const User = require("../models/user");

function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

function checkRole(role) {
    return (req, res, next) => {
        if (req.session.user.role !== role) {
            return res.send("Access Denied");
        }
        next();
    }
}

// VOLUNTEER
router.get(
    "/volunteer/dashboard",
    isLoggedIn,
    checkRole("volunteer"),
    async (req, res) => {

        const user = req.session.user;

        const donations = await Donation.find({
            email: user.email
        }).sort({ date: -1 });

        // Volunteer visits
        const visits = await Visit.find({
            volunteerEmail: user.email
        }).sort({ visitDate: -1 });

        // stats
        const totalDonations = donations.length;

        const totalMoney = donations
            .filter(d => d.amount)
            .reduce((sum, d) => sum + d.amount, 0);

        const itemsDonated = donations
            .filter(d => d.donationType !== "Money").length;

        res.render("dashboards/volunteer", {
            user,
            donations,
            visits,
            totalDonations,
            totalMoney,
            itemsDonated
        });

    }
);

// DONOR
router.get("/donor/dashboard",isLoggedIn,checkRole("donor"),async (req, res) => {
        const user = req.session.user;
        const donations = await Donation.find({
            email: user.email
        }).sort({ date: -1 });
        const totalDonations = donations.length;
        const totalMoney = donations
            .filter(d => d.amount)
            .reduce((sum, d) => sum + d.amount, 0);
        const itemsDonated = donations
            .filter(d => d.donationType !== "Money").length;
        res.render("dashboards/donor", {
            user,
            donations,
            totalDonations,
            totalMoney,
            itemsDonated
        });
    });

// SENIOR
router.get("/senior/dashboard", isLoggedIn, checkRole("senior"), async (req, res) => {
    const senior = await User.findById(req.session.user.id);
    const visits = await Visit.find({
        seniorEmail: req.session.user.email
    }).sort({ visitDate: -1 });
    res.render("dashboards/senior", {
        user: req.session.user, visits
    });

});

module.exports = router;
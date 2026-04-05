const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.get("/feedback", (req, res) => {
    res.render("pages/feedback");
});

router.post("/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        req.flash("success_msg", "Thank you for sharing your experience with HumanHood! 💚");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        req.flash("error_msg", "Feedback submission failed");
        res.redirect("/feedback");
    }
});

module.exports = router;
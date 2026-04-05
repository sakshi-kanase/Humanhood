const express = require("express")
const router = express.Router()
const Donation = require("../models/donation")

router.get("/volunteer/dashboard", async (req,res)=>{

    const donations = await Donation.find().sort({date:-1})

    res.render("volunteer-dashboard",{donations})

})

router.post("/update-status/:id", async (req,res)=>{

    const {status} = req.body

    await Donation.findByIdAndUpdate(
        req.params.id,
        {status}
    )

    res.redirect("/volunteer/dashboard")

})

module.exports = router
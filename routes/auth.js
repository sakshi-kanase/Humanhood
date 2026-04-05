const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("pages/register");
});

//register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.send("all fileds are required");
        }

        const exitstingUser = await User.findOne({ email });
        if (exitstingUser) {
            return res.send("Email already exit");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: role.toLowerCase().trim()
        });

        // res.send("Registration successful");
        req.flash("success_msg", "Registration Successful | Welcome to Humanhood!");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        req.flash("error_msg", "Registration Not Successful");
        res.redirect("/");
    }
});

//login
router.get("/login", (req, res) => {
    res.render("pages/login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        req.flash("error_msg", "Invalid email or Password");
        return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        req.flash("error_msg", "Invalid email or Password");
        return res.redirect("/login");
    }

    //save user in session
    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    req.flash("success_msg", `✔ Welcome ${user.name} | Login Successful`);

    //role based redirect
    if (user.role === "volunteer") {
        return res.redirect("/volunteer/dashboard");
    }
    if (user.role === "senior") {
        return res.redirect("/senior/dashboard");
    }
    if (user.role === "donor") {
        return res.redirect("/donor/dashboard");
    }
    res.redirect("/");
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


module.exports = router;
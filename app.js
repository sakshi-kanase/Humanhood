if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const User = require("./models/user");
const session = require("express-session");
const flash = require("connect-flash")
const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/gallery");
const donationRoutes = require("./routes/donation");
const volunteerRoutes = require("./routes/volunteer");
const ngoRoutes = require("./routes/ngo");
const feedbackRoutes = require("./routes/feedback");
const dashboardRoutes = require("./routes/dashboard");
const {
    isLoggedIn,
    isVolunteer,
    isSenior,
    isDonor
} = require("./middleware/auth");

connectDB();



app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "humanhoodsecret",
        resave: false,
        saveUninitialized: false
    })
);
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.use(dashboardRoutes);
app.use(authRoutes);
app.use(galleryRoutes);
app.use(donationRoutes);
app.use(volunteerRoutes);
app.use(feedbackRoutes);
app.use(ngoRoutes);

app.get("/", async (req, res) => {
    const volunteerCount = await User.countDocuments({ role: "volunteer" });
    const seniorCount = await User.countDocuments({ role: "senior" });
    const donorCount = await User.countDocuments({ role: "donor" });
    res.render("pages/home", {
        volunteerCount,
        seniorCount,
        donorCount
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.get("/gallery", (req, res) => {
    res.render("pages/gallery");
})

app.get("/donation", (req, res) => {
    res.render("pages/donation");
});

app.get("/references", (req, res) => {
    res.render("pages/reference");
});

app.get("/feedback", (req, res) => {
    res.render("pages/feedback");
});


// app.get("/test-user",async(req,res) =>{
//     const user = await User.create({
//         name:"test volunteer",
//         email:"test@humnhood1.com",
//         password:"1234",
//         role:"volunteer"
//     });
//     res.json(user);
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
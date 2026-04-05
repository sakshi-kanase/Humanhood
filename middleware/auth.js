exports.isLoggedIn = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
};

exports.isVolunteer = (req,res,next) =>{
    if(req.session.user.role !== "volunteer"){
        return res.status(403).send("Access denied");
    }
    next();
};

exports.isSenior = (req,res,next) =>{
    if(req.session.user.role !== "senior"){
        return res.status(403).send("Access denied");
    }
    next();
};

exports.isDonor = (req,res,next) =>{
    if(req.session.user.role !== "Donor"){
        return res.status(403).send("Access denied");
    }
    next();
};

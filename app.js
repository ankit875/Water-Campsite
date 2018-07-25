var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy=require("passport-local"),
    flash       = require("connect-flash"),
    methodOverride=require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDb      = require("./seeds")


var campgroundRoutes   = require("./routes/campgrounds"),
    authRoutes         = require("./routes/index"),
    commentRoutes      = require("./routes/comments")

mongoose.connect("mongodb://Ankit:ank875@ds253831.mlab.com:53831/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(flash());
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));

//seedDb(); //Seed the database

//Passport Configuration
app.use(require("express-session")({
    secret: 'Once again rusty is cutest dog in th world',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser  = req.user
    res.locals.error        = req.flash("error")
    res.locals.success      = req.flash("success")
    next()
})

app.use( "/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",authRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server has Started!!");
})
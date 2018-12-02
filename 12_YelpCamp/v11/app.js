var express                 = require("express");
var app                     = express();
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var Campground              = require("./models/campground.js");
var Comment                 = require("./models/comment.js");
var User                    = require("./models/User.js");
var seedDB                  = require("./seeds.js");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");
var campgroundRoutes        = require("./routes/campgroundRoutes.js");
var commentRoutes           = require("./routes/commentRoutes.js");
var indexRoutes             = require("./routes/indexRoutes.js");
var methodOverride          = require("method-override");
var flash                   = require("connect-flash");

mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: " ajfdfh dajsdhfkjdfks asdjhfashkjas kjsadhhaskjf",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USERNAME 
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//ROUTES
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

app.listen(3000,function(){
    console.log("Server Started");
});
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("Server Started");
// });
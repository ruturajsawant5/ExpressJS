var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground.js");
var Comment     = require("./models/comment.js");
var User        = require("./models/User.js");
var seedDB      = require("./seeds.js");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
seedDB();

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

//***
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
//**** 
// Campground.create(
//     {
//     name:"Yellow Tent",
//     image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144392f0c87fa3ecb6_340.jpg",
//     description:"This is Description"

//     },function(err, cat){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(cat);
//         } 
//     });

//ROOT
app.get("/",function(req,res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds",{campgrounds:campgrounds});
});

// NEW
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

//CREATE
app.post("/campgrounds",function(req,res){
    //GET DATA
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    Campground.create(
        {
        name:name,
        image:image,
        description:description
        },function(err, cat){
            if(err){
                console.log(err);
            }else{
                //REDIRECT
                res.redirect("/campgrounds");
            }
        });
});

// SHOW
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    // ).populate("comments").exec(
        // console.log(foundCampground);
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++");
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    })
  
});




// ++++++++++++++++++++++++++++++++
// COMMENT ROUTES
// ++++++++++++++++++++++++++++++++

// NEW
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
            }else{
                res.render("comments/new",{campground:foundCampground});
            }
        });
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err, campground){
        // console.log(campground);
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{

                    campground.comments.push(comment);
                    campground.save();
                    // console.log(campground);
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
            // res.render("comments/new",{campground:foundCampground});
        }
    });
});


// +++++++++++++++++++++++++++++
// AUTH ROUTES
// +++++++++++++++++++++++++
// show form
app.get("/register", function(req, res){
    res.render("register");
});
// sign up logic
app.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    })
})

// login
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
    // res.send("abc");
});

// logout
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});


// MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(3000,function(){
    console.log("Server Started");
});
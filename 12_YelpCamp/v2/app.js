// Added DB STUFF

var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp_v2");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

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
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds",{campgrounds:campgrounds});
});

// NEW
app.get("/campgrounds/new",function(req,res){
    res.render("new");
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
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundCampground});
        }
    })
  
});

app.listen(3000,function(){
    console.log("Server Started");
});
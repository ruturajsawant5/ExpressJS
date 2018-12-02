var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground.js");


//INDEX
router.get("/",function(req,res){
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
router.get("/new",function(req,res){
    res.render("campgrounds/new");
});

//CREATE
router.post("/",function(req,res){
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
router.get("/:id",function(req,res){
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

module.exports = router;
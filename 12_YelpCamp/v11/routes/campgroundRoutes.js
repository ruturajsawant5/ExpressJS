var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware"); //include index.js automatically

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
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
    //GET DATA
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    };
    Campground.create(
        {
        name:name,
        image:image,
        description:description,
        author:author
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
// EDIT
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    });
});
// UPDATE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    // find and update

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            // console.log(foundCampground);
            
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
   // res.redirect("/campgrounds");
});

// DESTROY CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;
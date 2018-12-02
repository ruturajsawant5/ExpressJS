var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment    = require("../models/comment.js");

// NEW
router.get("/new",isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
            }else{
                res.render("comments/new",{campground:foundCampground});
            }
        });
});

router.post("/",isLoggedIn,function(req,res){

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

// MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;

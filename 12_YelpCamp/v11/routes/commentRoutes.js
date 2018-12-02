var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment    = require("../models/comment.js");
var middleware = require("../middleware"); //include index.js automatically

// NEW
router.get("/new",middleware.isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
            }else{
                res.render("comments/new",{campground:foundCampground});
            }
        });
});

router.post("/",middleware.isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err, campground){
        // console.log(campground);
        if(err){
            console.log(err);
            req.flash("error","Something went wrong !!!"); 
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    // add username id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    // console.log(campground);
                    req.flash("success","Successfully added comment."); 
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
            // res.render("comments/new",{campground:foundCampground});
        }
    });
});

// EDIT FORM ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id, comment: foundComment});
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

// COMMENT DELETE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully deleted comment."); 
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;

var mangoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name:"Yellow Tent",
        image:"https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg",
        description:"This is Description"
    },
    {
        name:"Yesdgvllow Ten dfgsfdghdfht",
        image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg",
        description:"This is Desdfsgdsfgdfsg fgsdgsdf cription"
    },
    {
        name:"Yedfsvflldfgsdow T sdg gsdg ent",
        image:"https://cdn.pixabay.com/photo/2015/02/26/15/41/ginger-cat-650545_960_720.jpg",
        description:"This is Dfdgsdgfsdescription"
    }
] 

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed");
            data.forEach(function(seed){

                Campground.create(seed,function(err, campground){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("added");
                            Comment.create({
                                text:"jkdhkfjhakjdfhkjlasfkjhsadjk sadjfnahsdkjadjhsndklsha",
                                author:"Annonymous"
                            },function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created comment");
                                }
                            });
                        }
                    });

            })
        }
    });
};

module.exports = seedDB;

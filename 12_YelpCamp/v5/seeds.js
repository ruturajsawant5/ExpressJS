var mangoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name:"Yellow Tent",
        image:"https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor massa, ullamcorper eget felis eu, accumsan pulvinar justo. Nulla facilisis sed elit id faucibus. Mauris sagittis commodo metus vel venenatis. Nullam pulvinar est sed mi semper laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam id bibendum libero, eget tincidunt massa. Nullam at rutrum elit. Suspendisse condimentum suscipit justo ac faucibus. Curabitur elementum nec lectus a vestibulum. Cras et tempor lectus. Aliquam consectetur lorem magna, pellentesque fringilla tortor sollicitudin id."
    },
    {
        name:"Yesdgvllow",
        image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor massa, ullamcorper eget felis eu, accumsan pulvinar justo. Nulla facilisis sed elit id faucibus. Mauris sagittis commodo metus vel venenatis. Nullam pulvinar est sed mi semper laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam id bibendum libero, eget tincidunt massa. Nullam at rutrum elit. Suspendisse condimentum suscipit justo ac faucibus. Curabitur elementum nec lectus a vestibulum. Cras et tempor lectus. Aliquam consectetur lorem magna, pellentesque fringilla tortor sollicitudin id."
    },
    {
        name:"Yedfsvflldfgsd",
        image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor massa, ullamcorper eget felis eu, accumsan pulvinar justo. Nulla facilisis sed elit id faucibus. Mauris sagittis commodo metus vel venenatis. Nullam pulvinar est sed mi semper laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam id bibendum libero, eget tincidunt massa. Nullam at rutrum elit. Suspendisse condimentum suscipit justo ac faucibus. Curabitur elementum nec lectus a vestibulum. Cras et tempor lectus. Aliquam consectetur lorem magna, pellentesque fringilla tortor sollicitudin id.n"
    },
    {
        name:"Yedfsvflldf",
        image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor massa, ullamcorper eget felis eu, accumsan pulvinar justo. Nulla facilisis sed elit id faucibus. Mauris sagittis commodo metus vel venenatis. Nullam pulvinar est sed mi semper laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam id bibendum libero, eget tincidunt massa. Nullam at rutrum elit. Suspendisse condimentum suscipit justo ac faucibus. Curabitur elementum nec lectus a vestibulum. Cras et tempor lectus. Aliquam consectetur lorem magna, pellentesque fringilla tortor sollicitudin id."
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

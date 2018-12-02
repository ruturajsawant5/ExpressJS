var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data_asso");

//POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post",postSchema);

//USER
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    Posts:[postSchema]
});
var User = mongoose.model("User",userSchema);


// var newUser = new User({
//     name: 'ruturakj',
//     email:"kjdghfjkhsdg"
// });

// newUser.Posts.push({
//     title:"ljkfdhgjkhdkfjg",
//     content:"jhsrfkjvsdjkfvjks"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(user);
//     }
// });



//FIND
User.findOne({name:"ruturakj"},function(err, foundUser){
    if(err){
        console.log(err);
    }
    else{
        console.log(foundUser);
    }
});
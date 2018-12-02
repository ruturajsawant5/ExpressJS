var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/data_asso_objRef");
var Post = require("./models/post.js");
var User = require("./models/user.js");
//POST


//USER


// User.create({
//     name: "BOB",
//     email:"jhdiuhcds"
// });

// Post.create({
//     title:"kjhfadr",
//     content:"kfjhkvdkjfgjkdf"
// });

// Post.create({
//     title:"kjhfgfhfggadr",
//     content:"kfjhkvdkjfgjkdf"
// },function(err, post){
//     User.findOne({name:"BOB"},function(err, foundUser){
//         if(err){
//             console.log(err);
//         }
//         else{
           
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log("================================");
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });



// // FIND user and all posts
// User.findOne({name:"BOB"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });
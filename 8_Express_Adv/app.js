var express = require("express");;
var app = express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine","ejs");
var friends=["Ruturaj","Sid"];


app.get("/",function(req,res){
	res.render("home");
});

app.get("/friends",function(req,res){
	
	res.render("friends",{friends:friends});
});

app.post("/addfriend",function(req,res){
	var newF = req.body.newfriend;
	friends.push(newF);
	res.redirect("/friends");
});

// app.post()

app.listen(3000,function(){
	console.log("Server Started!!!!");
});
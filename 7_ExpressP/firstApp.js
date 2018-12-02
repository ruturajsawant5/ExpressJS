var express = require('express');
var app = express();

app.get("/",function(req,res){
	res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animalName",function(req,res){
	if(req.params.animalName=="pig"){
		res.send("The pig says 'Oink'");
	}
	else if(req.params.animalName=="cow"){
		res.send("The cow says 'Moo'");
	}
	else if(req.params.animalName=="dog"){
		res.send("The dog says 'Woof Woof!'");
	}
});

app.get("/repeat/hello/:valueNo",function(req,res){
	var i;
	var string='';
	for (var i = 0; i < req.params.valueNo; i++) {
		string=string+"hello ";
	}
	res.send(string);
});

app.get("/*",function(req,res){
	res.send("Sorry , page not found");
});

app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server has started!!!");
});
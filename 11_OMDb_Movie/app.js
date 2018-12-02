var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");


app.get("/",function (req,res) {
    res.render("search");
});

app.get("/results",function(req,res){
    var searchMovie = req.query.searchMovie;
    var url="http://www.omdbapi.com/?s="+searchMovie+"&apikey=thewdb";
    request(url,function(error,response,body) {
        if(!error&&response.statusCode==200){
            var parsedData=JSON.parse(body);
            res.render("results",{parsedData:parsedData});
        }
    });
});

app.listen(3000,function(){
    console.log("Server Started");
});
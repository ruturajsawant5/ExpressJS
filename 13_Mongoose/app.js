var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age:  Number
});

var Cat = mongoose.model("Cat",catSchema);

var firstCat = new Cat({
    name: "A",
    age: 11
});

firstCat.save(function(err, cat){
    if(err){
        console.log(err);
        return;
    }else{
        console.log("save");
        console.log(cat);
    }
});
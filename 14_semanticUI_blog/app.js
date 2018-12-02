var express         = require("express"),
expressSanitizer    = require("express-sanitizer"),
methodOverride      = require("method-override"),
bodyParser          = require("body-parser"),
mongoose            = require("mongoose"),
app                 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// DB SCHEMA MODEL
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:{type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

// ROUTES

// ROOT
app.get("/",function(req,res){
    res.redirect("/blogs");
})

// INDEX
app.get("/blogs",function(req,res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs: blogs});
        }
    })
});

// NEW
app.get("/blogs/new",function(req,res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    //sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body); 

    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blogs");
        }
    })
});

// SHOW
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    })
});

//EDIT
app.get("/blogs/:id/edit",function(req,res){
    

    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
        res.redirect("/blogs");
        }else{
        res.render("edit",{blog:foundBlog});
        }
    })
});

// PUT
app.put("/blogs/:id",function(req, res){
    // sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

//DELETE
app.delete("/blogs/:id",function(req,res){
    //destory
    Blog.findByIdAndRemove(req.params.id,function(err,destroyedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    })
});

app.listen(3000,function(){
    console.log("Server Started");
});
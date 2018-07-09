var express = require("express");
var app = express();

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
var mongoose = require("mongoose");
var mongoose_connect = require("./mongoose-connect.js");
mongoose.connect(mongoose_connect.mongoose_pw);


var commentSchema = new mongoose.Schema({
    name: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var comments = mongoose.model("Comment", commentSchema);

app.get("/", function(req, res){
    console.log("request to home page");
    res.render("landing.ejs", {title: "Eli Koslofsky - Home"});
});

app.get("/resume", function(req, res){
    console.log("request to resume page");
    res.render("resume.ejs", {title: "Eli Koslofsky - Resume"});
});

app.get("/comments", function(req, res){
    console.log("request to comments page");
    comments.find({}, function(err, comments){
        if(err){
            console.log("error");
        }
        else{
            console.log(comments + "added to DB");
            res.render("comments-index.ejs", {title: "Eli Koslofsky - Comments", comments:comments});
        }
    });
});

app.get("/comments/new", function(req, res){
    res.render("new-comment.ejs", {title: "Eli Koslofsky - Submit New Comment"});
});


app.post("/comments", function(req, res){
    
    console.log(req.body.name);
    
    comments.create({
    name: req.body.name, body: req.body.body
});
    res.redirect("/comments");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server is now running');
    })


// app.listen(3000, function(){
// 	console.log('Express started at' + app.get('port') + '; press Ctrl-C to terminate.');
// })

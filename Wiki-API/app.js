//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true })


const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

//////////////////////Requests Targetting ALL Articles ///////////////////////

app.route("/articles")

.get(function (req, res) {
    Article.find({}, function (err, results) {
        if (!err){
        console.log(results)
        res.send(results)
    }else{
        console.log(err)
        res.send(err)
    }})
})

.post(function (req, res) {
console.log(req.body.title);
console.log(req.body.content);


const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
});

newArticle.save(function(err){
    if (!err){
        res.send("Sucessfully added a new article")
    } else {
        res.send(err)
    }
});

})

.delete(function(req, res){
    Article.deleteMany(function (err){
        if (!err){
            res.send("Delete Successful")
        } else {
            res.send(err)
        }
    })
})


//////////////////////Requests Targetting Specific Articles ///////////////////////

app.route("/articles/:articleTitle")

.get(function (req, res) {
    Article.findOne({title: req.params.articleTitle }, function (err, foundArticle) {
        if (foundArticle){
            res.send(foundArticle)
        } else {
            res.send("No Articles Found")
        }
    })
})


.put(function (req, res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite:true}, function (err) {
        if (!err){
            res.send("Successfully Updated")
        }
    })
})

.patch(function (req, res) {



  Article.updateOne(
    {title: req.params.articleTitle}, 
    {$set: req.body},
    function(err){
        if(!err){
            res.send("Successfully Updated")
        } else {
            res.send(err)
        }
    }
  )  
});


let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}



app.listen(port, function(){
    console.log("Server started Successfully");
})
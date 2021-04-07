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

// app.get("/", function(req, res ){
//     Article.find({}, function (err, foundItems) {
//         console.log(foundItems)
//     })
// }

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}



app.listen(port, function(){
    console.log("Server started Successfully");
})
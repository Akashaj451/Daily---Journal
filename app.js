//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/pageDB",{ useNewUrlParser: true }, () => console.log('connected to mongo'));

mongoose.connect("mongodb+srv://admin-aj:Akashaj451%40@cluster0.duzhj.mongodb.net/pageDB", {
  useNewUrlParser: true
});
const pageSchema = new mongoose.Schema({composetext:String,composecontent:String});
const Angel = mongoose.model("Angel",pageSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//const datas=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Angel.find({},function(err,results){
    if(!err){
 res.render("home",{headingcontent:homeStartingContent,composelogs:results});
}
 });
});
app.get("/contact",function(req,res){
 res.render("contact",{contactcontent:contactContent});
});

app.get("/about",function(req,res){
 res.render("about",{aboutcontent:aboutContent}); //data round robbin from app.js to other ejs files method
});

app.get("/compose",function(req,res){
 res.render("compose");
});

app.get("/post/:topic",(function(req,res){
  const x1 =  _.lowerCase(req.params.topic );// tapping data from url
Angel.find({},function(err,datas){
  if(!err){
  datas.forEach(function(data){
  const x2 = _.lowerCase(data.composetext);
  const x3 = data.composetext;                             //foreach methos example code
  const x4 = data.composecontent;
  if(x1 === x2){
  res.render("check",{sendtitle:x3,sendparagraph:x4});
  }
  });
}
});
}));

app.post("/compose",function(req,res){
  const ct = req.body.n2;
  const cp =req.body.n4;
  const angel1 = new Angel({composetext:ct,composecontent:cp}); //***js object***
  //datas.push(store);
  angel1.save();
  res.redirect("/");
});


let port = process.env.PORT;
if(port==null||port==""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server Started Successfully");
});

// app.listen(process.env.PORT || 3000,function(){
//   console.log("Server Started Successfully");
// });

import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/work.ejs",(req,res)=>{
    res.render("work.ejs");
});
var items = [];
var newDir ="";
app.post("/",(req,res)=>{
    items.push(req.body["newItem"]);
    res.render("index.ejs",{item : items});
    
    console.log(items);

});
var workItems=[];
app.post("/work.ejs",(req,res)=>{
    workItems.push(req.body["newItem"]);
    res.render("work.ejs",{item : workItems});
    
    console.log(items);

});

app.listen(port,(req,res)=>
{
    console.log(`Your server on port ${port} is running succesfully`);
});
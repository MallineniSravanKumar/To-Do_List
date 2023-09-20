import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/listDB");
const listSchema = new mongoose.Schema({
    listName: String
});

const lis = mongoose.model("list",listSchema);
const worklis = mongoose.model("worklist",listSchema);

var items = [];
var newDir ="";
var workItems=[];
app.get("/",async(req,res)=>{
    
    await lis.find().then((p)=> {
        // mongoose.connection.close();
        p.forEach((i)=> {console.log(i.listName)});
        res.render("index.ejs",{item : p});
    
    }).catch((err)=>{console.log("Something went wrong");});
    
});

app.get("/work.ejs",async(req,res)=>{
    await worklis.find().then((w)=>{
        w.forEach((i)=>{console.log(i.listName)});
        res.render("work.ejs",{item : w});
    }).catch((err)=>{});
    
});

app.post("/",async(req,res)=>{
    items=[];
    var list = new lis({
        listName:req.body["newItem"],
    });

    
    await list.save().then(()=>{console.log()}).catch((error)=>{console.log("Please add a text to to do list")});
    await lis.find().then((p)=> {
        // mongoose.connection.close();
        p.forEach((i)=> {console.log(i.listName)});
        res.render("index.ejs",{item : p});
    
    }).catch((err)=>{console.log("Something went wrong");});
    
    

    // console.log(list);
    // items.push(req.body["newItem"]);
    // res.render("index.ejs",{item : items});
    
    console.log(items);

});

app.post("/work.ejs",async(req,res)=>{
    var workl = new worklis({
        listName: req.body["newItem"]
    });
    
    await workl.save().then(()=>{console.log("Worklist element is added");}).catch((err)=>{console.log(err);});

    await worklis.find().then(
        (w)=>{
            w.forEach((i)=> {console.log(i.listName);});
            res.render("work.ejs",{item : w});
        }
        ).catch((err)=>{
            console.log(err);
        });

});

app.listen(port,(req,res)=>
{
    console.log(`Your server on port ${port} is running succesfully`);
});
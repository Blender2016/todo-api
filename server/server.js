const express = require("express");
const bodyParser = require("body-parser");
const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((docs)=>{
        console.log("todo saved:",docs);
        res.send(docs);
    },(err)=>{
        console.log("UNable to save todo");
        res.status(400).send(err)
        });
});

app.listen(3000,()=>{
    console.log("Started on port 3000");
});
const _=require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");
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

app.get('/todos',(req,res)=>{
     Todo.find().then((todos)=>{
         console.log(JSON.stringify(todos,undefined,2));
         res.send({todos});
     },(err)=>{
         console.log(err);
         res.status(400).send(err);
     });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        console.log("ahmed",todo);
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
       res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
      res.status(404).send();
    });
    
});

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
     
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
     if(!todo){
         res.status(404).send();
     }
      res.send({todo});
    }).catch((err)=>{
      res.status(400).send();
    });

});

app.listen(3000,()=>{
    console.log('Started on port 3000');
});
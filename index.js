const express=require('express');
const path=require('path');
const port=800;
const app=express();
const db=require('./mongoose');
const Task=require('./models/task');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
var todoList=[
    
]
app.use(express.urlencoded());
app.post('/create-task',function(req,res){
    Task.create({
        name:req.body.name,
        date:req.body.date,
        category:req.body.category
    },function(err,newTask){
        if(err){
            console.log('Error in creating task');
            return;
        }
        console.log('*****',newTask);
        return res.redirect('/');
    });
});
app.get('/done-task',function(req,res){
    let id=req.query.id;
    Task.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting");
            return;
        }
        return res.redirect('/');
    });
});
app.get('/',function(req,res){
    Task.find({},function(err,task){
        if(err){
            console.log('Error');
            return;
        }
        return res.render('home',{
            title:"ToDo App",
            todo_list:task
        });
    });
    
});
app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log('yup');
});
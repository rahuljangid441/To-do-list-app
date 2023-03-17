//first step is to accquire express
const express = require('express');

//require path 
const path = require('path');

//declaring port
const port = 8000;



const db = require('./config/mongoose');
const ToDoList = require('./models/task');

//to fire up express app has all the functionalities of express libraries
const app = express();

//set up a view engine
app.set('view engine', 'ejs');

//to access the views folder and __dirname will tell us the current directory name  and will look for views folder inside directory
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.urlencoded());

//to use static files like css and js
app.use(express.static('assests'));


//this is dummy contact list it is used when we add contact without using Database
var TodoList = [
    {
        task: "Go to gym",
        date: "10/10/2022",
        category: "personal"

    },

    {
        task: "medidate",
        date: "10/12/2022",
        category: "others"
    },

    {
        task: "sumbit the project",
        date: "10/11/2022",
        category: "work"
    }
]


//this is to render contact list to our page
app.get('/', function (req, res) {

    ToDoList.find({}, function (err, tasks) {
        if (err) {
            console.log("there is an error from fetching data from DB");
            return;
        }
        return res.render('home', {
            title: "TODO App",
            To_do_list: tasks
        });

    });
});


//to create contact 
app.post('/create-task', function (req, res) {
    // console.log(req.body.task);
    // console.log(req.body.date);
    // console.log(req.body);
    // console.log(req.body);
    // TodoList.push(req.body);
    // return res.redirect('back');
    // console.log(req.body);
    ToDoList.create({
        task: req.body.task,
        date: req.body.date,
        category:req.body.category
    }, function (err, newTask) {
        if (err) {
            console.log("there is an error in making task", err);
            return;
        }
        console.log('*****', newTask);
        return res.redirect('back');

    });
});


//to delete contact
app.get('/delete-task' ,function(req,res){
    let id=req.query.id;
    ToDoList.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("there is an error in deleting element from DB");
            return;
        }
        return res.redirect('back');
    });

});


//check if server is running fine or not
app.listen(port, function (err) {
    if (err) {
        console.log("there is an error in running a server");
        return;
    }
    console.log("server is running fine on: ", port);
});
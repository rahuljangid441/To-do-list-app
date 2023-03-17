//require mongoose
const mongoose=require('mongoose');

//creating schema
const taskSchema=new mongoose.Schema({
    task: {
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    category: {
        type: String,
        // enum : ['Personal','Work','School','Cleaning' ,'Other'],
        required:true
    }
});



const ToDoApp=mongoose.model('ToDoApp',taskSchema);

//exporting schema
module.exports=ToDoApp;
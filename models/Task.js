import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
    },
    description : {
        type:  String
    },
    status : {
        type :String ,
        enum : ["TODO","IN_PROGRESS","COMPLETED"]
    } ,
    priority : {
        type :String ,
        enum : ["LOW","MEDIUM","HIGH"]
    },
    duoDate : {
        type : Number
    }
},{timestamps : true});

const Task = mongoose.model("Task",taskSchema);
export default Task ;
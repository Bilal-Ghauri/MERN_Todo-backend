import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'TodoUser'
    },
    content : {
        type : String,
    }
})

const TodoModel = mongoose.model('Todo' , todoSchema)

module.exports = TodoModel
import express from "express";

const TodoModel = require('../models/Todo')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/postTodo',auth, async(req : any, res : any)=> {
    const {content} = req.body
    try {
        const newTodo = new TodoModel({user : req.user , content : content})
        await newTodo.save()
        return res.status(200).json({msg : "todo added"})
    } catch (error) {
        return res.status(500).json({ msg : 'Server Error'})
    }
})


router.get('/getAllTodo' , auth , async(req : any, res : any)=> {
    try {
        const allTodos = await TodoModel.find({user : req.user})
        return res.status(200).json(allTodos)
    } catch (error) {
        return res.status(500).json({ msg : 'Server Error'})
    }
})

router.delete('/deleteTodo/:id', auth , async(req : any, res : any)=> {
    try {
        const {id} = req.params
        await TodoModel.findByIdAndDelete({_id : id})
        return res.status(200).json({msg : "todo deleted"})
    } catch (error) {
        return res.status(500).json({ msg : 'Server Error'})
    }
})

router.put('/editTodo/:id', auth , async(req : any, res : any)=> {
    try {
        const {id} = req.params
        const {content} = req.body
        const todo = await TodoModel.findOneAndUpdate({_id : id} , {content : content} , {new : true})
        return res.status(200).json({msg : "todo updated" , todo})

    } catch (error) {
        return res.status(500).json({ msg : 'Server Error'})
    }
})


module.exports = router
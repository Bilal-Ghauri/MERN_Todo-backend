import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const connectDB = async()=> {
    return mongoose.connect('mongodb+srv://Bilal:Bilalghauri@contactmanager.q79x0.mongodb.net/?retryWrites=true&w=majority' , ()=> {
        console.log('db connected');
    })
}

connectDB()
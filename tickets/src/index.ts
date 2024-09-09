import mongoose from "mongoose"
import { app } from "./app"

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    try {
        //creating and connected to mongodb 'auth' database
        mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongodb tickets')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, () => {
        console.log('Listening tickets on port 3000')
    })
}

start()
import express from 'express';
import { json } from "body-parser";
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/singup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
require('express-async-errors');//need to attach on every file

import mongoose from 'mongoose';

const app = express();
app.use(json());


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

/*
this not require because using express-async-errors
app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})
*/

app.all('*', () => {
    throw new NotFoundError()
}
)

app.use(errorHandler)

const start = async () => {
    try {
        //creating and connected to mongodb 'auth' database
        mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('connected to mongodb')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
}

start()
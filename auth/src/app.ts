import express from 'express';
import { json } from "body-parser";
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/singup';
import { errorHandler } from '@rameticket/common';
import { NotFoundError } from '@rameticket/common';
require('express-async-errors');//need to attach on every file

import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

export const app = express();

app.set('trust proxy', true); //bcz we use ingress nignix which is proxy
app.use(json());
app.use(cookieSession({
    signed: false,//disable encryption
    secure: process.env.NODE_ENV !== 'test' // true mean -it works on https connection only. in testing env it must be false 
}))
//
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

import express from 'express';
import { json } from "body-parser";

import { errorHandler } from '@rameticket/common';
import { NotFoundError,currentUser } from '@rameticket/common';
require('express-async-errors');//need to attach on every file

import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';

export const app = express();

app.set('trust proxy', true); //bcz we use ingress nignix which is proxy
app.use(json());
app.use(cookieSession({
    signed: false,//disable encryption
    secure: process.env.NODE_ENV !== 'test' // true mean -it works on https connection only. in testing env it must be false 
}))
app.use(currentUser)//get user details from token

app.use(createTicketRouter);
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

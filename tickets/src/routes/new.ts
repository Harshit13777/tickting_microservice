import express , {NextFunction, Request, Response} from 'express'
import {currentUser,requireAuth,validateRequest,NotAuthorizedError} from '@rameticket/common'
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
const router = express.Router();
require('express-async-errors');//need to attach on every file

router.post('/api/tickets',requireAuth,
    [
    body('title').exists().withMessage('Title is required')
    .notEmpty().withMessage(
        'Filed cannot be Empty'
    ),
    body('price').isFloat({gt:0}).withMessage('Price must greater then 0')
],
validateRequest,async (req:Request,res:Response)=>{
    const {title,price}=req.body;
    const ticket = Ticket.build({title,price,userId:req.currentUser!.id});
    await ticket.save();
    res.status(201).send(ticket)
})

export {router as createTicketRouter}
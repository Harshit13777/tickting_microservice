import express , {NextFunction, Request, Response} from 'express'
import {currentUser,requireAuth,validateRequest,NotAuthorizedError, NotFoundError} from '@rameticket/common'
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
const router = express.Router();

router.get('/api/tickets/:id',async (req:Request,res:Response)=>{
    const TicketId= req.params.id;
    const ticket= await Ticket.findById(TicketId)
    if(!ticket)
     throw new NotFoundError();
    res.send(ticket)
    
})

export {router as showTicket}
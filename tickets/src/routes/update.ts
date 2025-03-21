import express , {NextFunction, Request, Response} from 'express'
import {currentUser,requireAuth,validateRequest,NotAuthorizedError, NotFoundError, BadRequestError} from '@rameticket/common'
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.put('/api/tickets/:id',requireAuth,
    [
    body('title').exists().withMessage('Title is required')
    .notEmpty().withMessage(
        'Title cannot be Empty'
    ),
    body('price').isFloat({gt:0}).withMessage('Price must greater then 0')
],
validateRequest,async (req:Request,res:Response)=>{
   const ticket = await Ticket.findById(req.params.id);

   if(!ticket){
    throw new NotFoundError()
   } 
   if(ticket.orderId){
    throw new BadRequestError('Cannot edit a reserved ticket')
   }
   if(ticket.userId !== req.currentUser!.id){
    throw new NotAuthorizedError()
   }

   ticket.set({
    title: req.body.title,
    price: req.body.price
   })
   await ticket.save();
   //send event
     //publish the event
     new TicketUpdatedPublisher(natsWrapper.client()).publish({
        id:ticket.id,
        title:ticket.title,
        price: ticket.price,
        userId:ticket.userId,
        version:ticket.version

    })
   res.send(ticket)

})

export {router as updateTicketRouter}
import express , {NextFunction, Request, Response} from 'express'
import {currentUser,requireAuth,validateRequest,NotAuthorizedError, NotFoundError} from '@rameticket/common'
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
const router = express.Router();

router.put('/api/tickets/:id',requireAuth,
    [
    body('title').exists().withMessage('Title is required')
    .notEmpty().withMessage(
        'Filed cannot be Empty'
    ),
    body('price').isFloat({gt:0}).withMessage('Price must greater then 0')
],
validateRequest,async (req:Request,res:Response)=>{
   const ticket = await Ticket.findById(req.params.id);

   if(!ticket){
    throw new NotFoundError()
   }
   res.send(ticket)

})

export {router as updateTicketRouter}
import request from "supertest";
import {app} from '../../app'
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";



it('returns a 404 if provided id does not exist',async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie',global.signin())
    .send({
        title:'ticket1',price:20
    })
    .expect(404);
})

it('returns a 401 if user is not authenticated',async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title:'ticket1',price:20
    })
    .expect(404);
})
it('returns a 401 if user does not own ticket',()=>{
    
})
it('returns a 400 if user provides an invalid title or price',()=>{

})
it('provided a valid input',()=>{

})
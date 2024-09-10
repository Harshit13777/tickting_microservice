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
    .expect(401);
})
it('returns a 401 if user does not own ticket',async ()=>{
    const res= await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title:'Ticket1',
        price:20
    });

    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie',global.signin())
    .send({
        title:'Ticket1',
        price:1000
    })
    .expect(401)

})
it('returns a 400 if user provides an invalid title or price',async ()=>{
    const cookie=global.signin()
    const res= await request(app)
    .post('/api/tickets')
    .set('Cookie',cookie)
    .send({
        title:'Ticket1',
        price:20
    });

    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:'',
        price:10
    })
    .expect(400)

    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:'jkhkjhjk',
        price:-10
    })
    .expect(400)

})
it('provided a valid input',async ()=>{
    const cookie=global.signin()
    const res= await request(app)
    .post('/api/tickets')
    .set('Cookie',cookie)
    .send({
        title:'Ticket1',
        price:20
    });

    const Response = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie',cookie)
    .send({
        title:'Edit Ticket',
        price:10
    })
    .expect(200);
    expect(Response.body.title).toEqual('Edit Ticket')
    expect(Response.body.price).toEqual(10)
    
})
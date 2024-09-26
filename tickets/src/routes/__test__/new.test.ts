import request from "supertest";
import {app} from '../../app'
import { Ticket } from "../../models/tickets";



it('has router handler listeneing to /api/tickerts for post requests',async ()=>{
    const res = await request(app).
    post('/api/tickets')
    .send({})
    
})
it('can not be accessed if user is not signed in ',async ()=>{
    const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
})
it('can only be accessed if user is signed in ',async ()=>{
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({})
    .expect(400)
})
it('returns an error if invalid title is provided',async ()=>{
   await request(app)
   .post('/api/tickets')
   .set('Cookie',global.signin())
   .send({
    title:'',
    price:20
   })
   .expect(400);
   await request(app)
   .post('/api/tickets')
   .set('Cookie',global.signin())
   .send({
    
    price:20
   })
   .expect(400);

})
it('returns an error if invalid price is provided',async ()=>{

    await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
     title:'hjhkjhjk',
     price:-20
    })
    .expect(400);
})
it('creates a ticket with valid inputs',async ()=>{
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);
    
    await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
     title:'hjhkjhjk',
     price:20
    })
    .expect(201);

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);

})
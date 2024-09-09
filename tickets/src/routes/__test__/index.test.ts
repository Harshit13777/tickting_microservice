import request from "supertest";
import {app} from '../../app'
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";


it('can fetch list of tickets',async ()=>{
    await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',global.signin())
    .send({
        title:'Ticket1',
        price:20
    }).expect(201)
  
    
    await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',global.signin())
    .send({
        title:'Ticket2',
        price:20
    })
    
    await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',global.signin())
    .send({
        title:'Ticket3',
        price:20
    })
    
    const response = await request(app)
    .get('/api/tickets/')
    .send()
    .expect(200)

    expect(response.body.length).toEqual(3)
    
})

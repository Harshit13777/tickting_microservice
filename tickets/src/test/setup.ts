
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import request from "supertest";
import { app } from '../app';
import { sign } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'

let mongo: any;
//setup mongo server in memory
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

    mongo = await MongoMemoryServer.create()

    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        dbName: "verifyMASTER"
    });
})

// before each test case reset the database
beforeEach(async () => {

    const collections = await mongoose.connection.db?.collections()!;
    //console.log('collection',collections)
    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

// after all test case close mongo in memory server and stop connection
afterAll(async () => {
    if (mongo) {

        await mongo.stop();
    }
    await mongoose.connection.close();
})

jest.mock('../../nats-wrapper')


declare global{
    var signin:()=>string[];
}

global.signin =()=>{
    //build jwt payload
    const payload={
        id:new mongoose.Types.ObjectId().toHexString(),
        email:'test@test.com'
    }
    // create jwt!
    const token = jwt.sign(payload,process.env.JWT_KEY!);
    //build session Object. {jwt:MY_JWT}
    const session = {jwt:token};
    //turn that session in to json
const sessionJSon= JSON.stringify(session)

    //take json and encode it as base64
    const base64 = Buffer.from(sessionJSon).toString('base64')

    return [`session=${base64}`];
}
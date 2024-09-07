
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import request from "supertest";
import { app } from '../app';
import { sign } from 'jsonwebtoken';

let mongo: any;
//setup mongo server in memory
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'

    mongo = await MongoMemoryServer.create()

    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {

    });
})

// before each test case reset the database
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
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

declare global {

    var signup: () => Promise<string[]>

}

global.signup = async () => {
    const email = 'test@test.com'
    const password = 'password';

    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
    const cookie = res.get('Set-Cookie') as string[];
    return cookie

}
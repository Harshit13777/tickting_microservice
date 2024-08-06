import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';

let mongo: any;
//setup mongo server in memory
beforeAll(async () => {
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
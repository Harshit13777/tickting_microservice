import request from "supertest";
import { app } from "../../app";


it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
})
it('returns a 400 on missing email and password', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: '',
            password: ''
        })
        .expect(400);
})
it('returns a 200 on successfully signin', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
})
it('returns a 400 on incorrect password signin', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'iassword'
        })
        .expect(400);
})



it('sets a cookie after successful signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
    const res2 = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    expect(res2.get('Set-Cookie')).toBeDefined()
})
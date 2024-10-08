import request from "supertest";
import { app } from "../../app";


it('returns a 201 on succrssful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
})
it('disallows duplicate emails', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
})

it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
})
it('returns a 400 on missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '',
            password: ''
        })
        .expect(400);
})
it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: 'fsjlfds'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined()
})
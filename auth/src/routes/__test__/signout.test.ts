import request from "supertest";
import { app } from "../../app";


it('return 200 on successfully signout', async () => {
    const res_signup = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(res_signup.get('Set-Cookie')).toBeDefined()

    return await request(app)
        .get('/api/users/signout').expect(200);


})
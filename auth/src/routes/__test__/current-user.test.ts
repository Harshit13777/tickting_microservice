import request from "supertest";
import { app } from "../../app";
import { signupRouter } from "../singup";


it('signup and then get current user details', async () => {
    const cookie = await global.signup();

    return await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .expect(200);

})
it('not signup', async () => {

    const res = await request(app)
        .get('/api/users/currentuser')
        .expect(401);

})
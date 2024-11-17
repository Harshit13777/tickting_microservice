import express, { Request, Response } from "express";
require('express-async-errors');//need to attach on every file

const router = express.Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
    //null all cookie from user browser
    req.session = null;
    res.send({})
    return
})

export { router as signoutRouter };
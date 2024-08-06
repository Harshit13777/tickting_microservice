import express, { Request, Response } from "express";

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    //null all cookie from user browser
    req.session = null;
    res.send({})
})

export { router as signoutRouter };
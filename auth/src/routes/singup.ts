import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isLength({ max: 20, min: 4 })
        .withMessage('Password must be between 4 to 20')
], (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new Error('Email or password not valid');
    }

    const { email, password } = req.body;
    console.log(email, password)

    res.send('Account created')
})

export { router as signupRouter };
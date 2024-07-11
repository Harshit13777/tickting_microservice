import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { RequestDatabaseError } from "../errors/request-database-error";

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
        throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;
    console.log(email, password)
    throw new RequestDatabaseError()

    res.send('Account created')
})

export { router as signupRouter };
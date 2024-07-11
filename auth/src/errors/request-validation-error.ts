import { ValidationError } from "express-validator";
import { ResponseError } from "../middleware/error-handler";
import { CustomError } from "./CustonError-abstract";

export class RequestValidationError extends CustomError {

    statusCode = 400
    constructor(private errors: ValidationError[]) {
        super('Invalid Request parameters')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {

        return (this.errors.map((error) => {
            if (error.type == 'field') {
                return { message: error.msg as string, field: error.path }
            }
            return { message: error.msg }
        }))
    }

}
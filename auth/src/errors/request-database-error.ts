import { ValidationError } from "express-validator";
import { ResponseError } from "../middleware/error-handler";
import { CustomError } from "./CustonError-abstract";

export class RequestDatabaseError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = 500
    constructor(message?: string) {
        super(message)
        Object.setPrototypeOf(this, RequestDatabaseError.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.reason }] as ResponseError

    }


}
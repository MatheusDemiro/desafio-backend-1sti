import { Response } from 'express';
import { NotFoundResponse, BadRequestResponse, InternalErrorResponse, ConflictResponse } from './api-response.logic';
import { ErrorType } from 'src/domain/enums/error-type.enum';
import { Strings } from 'src/domain/shared/strings';

export class ApiError extends Error {
    constructor(public type: ErrorType, public message: string) {
        super(type);
    }

    public static handle(err: Error, res: Response): Response {
        let result = null;
        if (err instanceof ApiError) {
            switch (err.type) {
                case ErrorType.NOT_FOUND:
                    result = new NotFoundResponse(err.message).send(res);
                    break;
                case ErrorType.BAD_REQUEST:
                    result = new BadRequestResponse(err.message).send(res);
                    break;
                case ErrorType.CONFLICT_ERROR:
                    result = new ConflictResponse(err.message).send(res);
                    break;
                default:
                    result = new InternalErrorResponse().send(res);
                    break;
            }
        } else {
            result = new InternalErrorResponse(err?.message).send(res);
        }

        return result;
    }
}

export class InternalError extends ApiError {
    constructor(message = Strings.GENERIC_ERROR) {
        super(ErrorType.INTERNAL, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = Strings.GENERIC_BAD_REQUEST) {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message?: string) {
        super(ErrorType.NOT_FOUND, message || Strings.GENERIC_NOT_FOUND_ERROR);
    }
}

export class ConflictError extends ApiError {
    constructor(message = Strings.GENERIC_CONFLICT_ERROR) {
        super(ErrorType.CONFLICT_ERROR, message);
    }
}

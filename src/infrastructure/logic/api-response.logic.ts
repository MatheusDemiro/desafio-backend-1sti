import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Strings } from 'src/domain/shared/strings';

class ApiResponse {
    // eslint-disable-next-line no-useless-constructor
    constructor(protected statusCode: HttpStatus, protected message: string) {}

    protected prepare<T extends ApiResponse>(res: Response, response?: T): Response {
        if (response) {
            return res.status(this.statusCode).json(this.formatData(response));
        } else {
            return res.status(this.statusCode).json({ message: this.message, statusCode: this.statusCode });
        }
    }

    public send(res: Response): Response {
        return this.prepare<ApiResponse>(res);
    }

    private formatData<T extends ApiResponse>(response: T) {
        const clone: T = {} as T;
        Object.assign(clone, response);
        return clone;
    }
}

export class NotFoundResponse extends ApiResponse {
    constructor(message = Strings.GENERIC_NOT_FOUND_ERROR) {
        super(HttpStatus.NOT_FOUND, message);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = Strings.GENERIC_BAD_REQUEST) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}

export class SuccessMessageResponse extends ApiResponse {
    constructor(message = Strings.GENERIC_SUCCESS) {
        super(HttpStatus.OK, message);
    }
}

export class SuccessDataResponse<T> extends ApiResponse {
    constructor(message = Strings.GENERIC_SUCCESS, status = HttpStatus.OK, private data: T) {
        super(status, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessDataResponse<T>>(res, this);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = Strings.GENERIC_ERROR) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}

export class ConflictResponse extends ApiResponse {
    constructor(message = Strings.GENERIC_CONFLICT_ERROR) {
        super(HttpStatus.CONFLICT, message);
    }
}

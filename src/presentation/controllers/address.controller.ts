import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { AddressService } from 'src/domain/services/address.service';
import { ApiError } from 'src/infrastructure/logic/api-error.logic';
import { SuccessDataResponse } from 'src/infrastructure/logic/api-response.logic';
import { Response } from 'express';
import { AddressResponseModel } from 'src/domain/models/address-response.model';

@Controller('api/addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    // Get and save the address if it doesn't exist in the database
    @Get('/:zipCode')
    async getAddressByZipCode(@Param('zipCode') zipCode: string, @Res() res: Response): Promise<Response> {
        try {
            const address: AddressResponseModel = await this.addressService.findAddressByZipCode(zipCode);

            return new SuccessDataResponse<AddressResponseModel>(undefined, HttpStatus.OK, address).send(res);
        } catch (error) {
            return ApiError.handle(error, res);
        }
    }
}

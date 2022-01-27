import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Address } from 'src/infrastructure/database/entities/address.entity';
import { AddressRepository } from 'src/infrastructure/database/repositories/address.repository';
import { BadRequestError, NotFoundError } from 'src/infrastructure/logic/api-error.logic';
import { AddressResponseError } from 'src/presentation/errors/address.error';
import { AddressResponseModel } from '../models/address-response.model';
import { ExternalAddressResponseDto } from '../dto/address/external-address-response.dto';
import { Strings } from '../shared/strings';
import { Utils } from '../shared/utils';

@Injectable()
export class AddressService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private httpService: HttpService,
        private readonly addressRepository: AddressRepository
    ) {}

    async getAndSaveAddressByZipCode(zipCode: string): Promise<Address> {
        zipCode = Utils.removeSpecialCharacters(zipCode);

        if (!this.validateZipCode(zipCode)) {
            throw new BadRequestError(Strings.INVALID_ZIP_CODE_ERROR);
        }

        let address = await this.getAddressByZipCode(zipCode);

        if (address == null || this.checkCacheExpiration(address)) {
            const externalAddress = await this.findExternalAddressByZipCode(zipCode);

            if (address == null) {
                await this.saveAddress(externalAddress);
            } else {
                await this.updateAddress(externalAddress);
            }

            address = externalAddress;
        }

        return address;
    }

    async saveAddress(address: Address): Promise<Address> {
        return await this.addressRepository.save(address);
    }

    async updateAddress(address: Address): Promise<boolean> {
        const result = await this.addressRepository.update({ zipCode: address.zipCode }, address);

        return result.affected > 0;
    }

    async findAddressByZipCode(zipCode: string): Promise<AddressResponseModel> {
        const address = await this.getAndSaveAddressByZipCode(zipCode);

        return this.mapper.map(address, AddressResponseModel, Address);
    }

    async getAddressByZipCode(zipCode: string): Promise<Address> {
        const result = await this.addressRepository.findOne({ where: { zipCode: zipCode } });

        return result;
    }

    private async findExternalAddressByZipCode(zipCode: string): Promise<Address> {
        const response = await lastValueFrom(
            this.httpService.get<ExternalAddressResponseDto | AddressResponseError>(
                `https://viacep.com.br/ws/${zipCode}/json/`
            )
        );

        if ((response.data as AddressResponseError).erro) {
            throw new NotFoundError(Strings.NOT_FOUND_ADDRESS_ERROR);
        }

        const mappedAddress = this.mapper.map(
            response.data as ExternalAddressResponseDto,
            Address,
            ExternalAddressResponseDto
        );

        return mappedAddress;
    }

    private checkCacheExpiration(address: Address): boolean {
        let result = false;
        if (address != null) {
            const updateAt = Date.parse(address.updateAt);
            const cacheExpirationTime = Utils.convertHoursToMilliseconds(
                Number.parseFloat(process.env.CACHE_VALIDATION)
            );
            if (Date.now() - updateAt >= cacheExpirationTime) {
                result = true;
            }
        }

        return result;
    }

    private validateZipCode(value: string): boolean {
        let result = false;

        const zipCode = value.replace(/\D/g, '');

        if (zipCode != '' || zipCode != undefined) {
            const regularExpression = /^[0-9]{8}$/;

            if (regularExpression.test(zipCode)) {
                result = true;
            }
        }

        return result;
    }
}

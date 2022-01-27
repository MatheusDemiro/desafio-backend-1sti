import { mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { AddressResponseModel } from 'src/domain/models/address-response.model';
import { ExternalAddressResponseDto } from 'src/domain/dto/address/external-address-response.dto';
import { Utils } from 'src/domain/shared/utils';
import { Address } from '../entities/address.entity';

export class AddressProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile(): MappingProfile {
        return (mapper: Mapper) => {
            mapper
                .createMap(Address, AddressResponseModel)
                .forMember(
                    (dest) => dest.zipCode,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.zipCode);
                    })
                )
                .forMember(
                    (dest) => dest.city,
                    mapFrom((src) => {
                        return src.city;
                    })
                )
                .forMember(
                    (dest) => dest.state,
                    mapFrom((src) => {
                        return src.state;
                    })
                )
                .forMember(
                    (dest) => dest.street,
                    mapFrom((src) => {
                        return src.street;
                    })
                );
            mapper
                .createMap(AddressResponseModel, Address)
                .forMember(
                    (dest) => dest.zipCode,
                    mapFrom((src) => {
                        return src.zipCode;
                    })
                )
                .forMember(
                    (dest) => dest.city,
                    mapFrom((src) => {
                        return src.city;
                    })
                )
                .forMember(
                    (dest) => dest.state,
                    mapFrom((src) => {
                        return src.state;
                    })
                )
                .forMember(
                    (dest) => dest.street,
                    mapFrom((src) => {
                        return src.street;
                    })
                );
            mapper
                .createMap(ExternalAddressResponseDto, Address)
                .forMember(
                    (dest) => dest.zipCode,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.cep);
                    })
                )
                .forMember(
                    (dest) => dest.city,
                    mapFrom((src) => {
                        return src.localidade;
                    })
                )
                .forMember(
                    (dest) => dest.state,
                    mapFrom((src) => {
                        return src.uf;
                    })
                )
                .forMember(
                    (dest) => dest.street,
                    mapFrom((src) => {
                        return src.logradouro;
                    })
                );
        };
    }
}

import { mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateUserDto } from 'src/domain/dto/user/create-user.dto';
import { UserResponseModel } from 'src/domain/models/user-response.model';
import { Utils } from 'src/domain/shared/utils';
import { User } from '../entities/user.entity';

export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile(): MappingProfile {
        return (mapper: Mapper) => {
            mapper
                .createMap(CreateUserDto, User)
                .forMember(
                    (dest) => dest.name,
                    mapFrom((src) => {
                        return src.name;
                    })
                )
                .forMember(
                    (dest) => dest.cpf,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.cpf);
                    })
                )
                .forMember(
                    (dest) => dest.phone,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.phone);
                    })
                )
                .forMember(
                    (dest) => dest.address.street,
                    mapFrom((src) => {
                        return src.street;
                    })
                )
                .forMember(
                    (dest) => dest.address.state,
                    mapFrom((src) => {
                        return src.state;
                    })
                )
                .forMember(
                    (dest) => dest.address.city,
                    mapFrom((src) => {
                        return src.city;
                    })
                )
                .forMember(
                    (dest) => dest.address.zipCode,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.zipCode);
                    })
                );
            mapper
                .createMap(User, UserResponseModel)
                .forMember(
                    (dest) => dest.id,
                    mapFrom((src) => {
                        return src.id;
                    })
                )
                .forMember(
                    (dest) => dest.name,
                    mapFrom((src) => {
                        return src.name;
                    })
                )
                .forMember(
                    (dest) => dest.cpf,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.cpf);
                    })
                )
                .forMember(
                    (dest) => dest.phone,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.phone);
                    })
                )
                .forMember(
                    (dest) => dest.street,
                    mapFrom((src) => {
                        return src.address.street;
                    })
                )
                .forMember(
                    (dest) => dest.state,
                    mapFrom((src) => {
                        return src.address.state;
                    })
                )
                .forMember(
                    (dest) => dest.city,
                    mapFrom((src) => {
                        return src.address.city;
                    })
                )
                .forMember(
                    (dest) => dest.zipCode,
                    mapFrom((src) => {
                        return Utils.removeSpecialCharacters(src.address.zipCode);
                    })
                );
        };
    }
}

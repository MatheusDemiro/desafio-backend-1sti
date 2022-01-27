import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { Address } from 'src/infrastructure/database/entities/address.entity';
import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { cpf } from 'cpf-cnpj-validator';
import { BadRequestError, ConflictError, NotFoundError } from 'src/infrastructure/logic/api-error.logic';
import { Strings } from '../shared/strings';
import { AddressService } from './address.service';
import { UserResponseModel } from '../models/user-response.model';

@Injectable()
export class UserService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly userRepository: UserRepository,
        private readonly addressService: AddressService
    ) {}

    private async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    private async getByCpf(cpf: string): Promise<User> {
        return await this.userRepository.findOne({ where: { cpf: cpf } });
    }

    private async getById(id: number): Promise<User> {
        return await this.userRepository.findOne({ relations: ['address'], where: { id: id } });
    }

    private async update(user: User): Promise<User> {
        await this.userRepository.update({ id: user.id }, user);

        return user;
    }

    private async verifyUser(id: number, cpf: string): Promise<void> {
        const user = await this.getByCpf(cpf);

        if (user.id != id) {
            throw new ConflictError(Strings.DUPLICATE_USER_ERROR);
        }
    }

    private async getAddress(zipCode: string): Promise<Address> {
        const address = await this.addressService.getAddressByZipCode(zipCode);

        if (address == null) {
            throw new NotFoundError(Strings.NOT_FOUND_ADDRESS_ERROR);
        }

        return address;
    }

    async getUserByCpf(cpf: string): Promise<UserResponseModel> {
        const user = await this.userRepository.findOne({ relations: ['address'], where: { cpf: cpf } });

        return this.mapper.map(user, UserResponseModel, User);
    }

    async getUsers(): Promise<UserResponseModel[]> {
        const users = await this.userRepository.find({ relations: ['address'] });

        return this.mapper.mapArray(users, UserResponseModel, User);
    }

    async saveOrUpdateUser(createUserDto: CreateUserDto): Promise<UserResponseModel> {
        if (!cpf.isValid(createUserDto.cpf)) {
            throw new BadRequestError(Strings.INVALID_CPF_ERROR);
        }

        let user = this.mapper.map(createUserDto, User, CreateUserDto);

        // Extra check
        const address = await this.getAddress(user.address.zipCode);

        user.address = address;

        const oldUser = await this.getByCpf(user.cpf);

        if (oldUser == null) {
            user = await this.save(user);
        } else {
            oldUser.cpf = user.cpf;
            oldUser.name = user.name;
            oldUser.phone = user.phone;
            oldUser.address = user.address;

            user = await this.update(oldUser);
        }

        return this.mapper.map(user, UserResponseModel, User);
    }

    async updateUser(id: number, createUserDto: CreateUserDto): Promise<UserResponseModel> {
        if (!id) {
            throw new BadRequestError();
        }

        const createUser = this.mapper.map(createUserDto, User, CreateUserDto);

        const oldUser = await this.getById(id);

        if (oldUser == null) {
            throw new NotFoundError(Strings.NOT_FOUND_USER_ERROR);
        }

        await this.verifyUser(id, createUser.cpf);

        const address = await this.addressService.getAndSaveAddressByZipCode(createUser.address.zipCode);

        oldUser.address = address;
        oldUser.cpf = createUser.cpf;
        oldUser.name = createUser.name;
        oldUser.phone = createUser.phone;

        await this.userRepository.update({ id: id }, oldUser);

        return this.mapper.map(oldUser, UserResponseModel, User);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getById(id);

        if (user == null) {
            throw new NotFoundError(Strings.NOT_FOUND_USER_ERROR);
        }

        await this.userRepository.delete({ id: id });
    }
}

import { AutomapperModule } from '@automapper/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/domain/services/address.service';
import { UserService } from 'src/domain/services/user.service';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserProfile } from '../database/profiles/user.profile';
import { AddressRepository } from '../database/repositories/address.repository';
import { UserRepository } from '../database/repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, AddressRepository]), AutomapperModule, HttpModule],
    controllers: [UserController],
    providers: [UserService, UserProfile, AddressService],
})
export class UserModule {}

import { AutomapperModule } from '@automapper/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from 'src/domain/services/address.service';
import { AddressController } from 'src/presentation/controllers/address.controller';
import { AddressProfile } from '../database/profiles/address.profile';
import { AddressRepository } from '../database/repositories/address.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository]), AutomapperModule, HttpModule],
    controllers: [AddressController],
    providers: [AddressService, AddressProfile],
})
export class AddressModule {}

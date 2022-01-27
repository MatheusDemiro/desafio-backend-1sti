import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './infrastructure/ioc/user.module';
import { AddressModule } from './infrastructure/ioc/address.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AutomapperModule.forRoot({
            options: [{ name: 'classes', pluginInitializer: classes }],
            singular: true,
        }),
        UserModule,
        AddressModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

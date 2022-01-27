import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/domain/dto/user/create-user.dto';
import { UserResponseModel } from 'src/domain/models/user-response.model';
import { UserService } from 'src/domain/services/user.service';
import { Utils } from 'src/domain/shared/utils';
import { ApiError } from 'src/infrastructure/logic/api-error.logic';
import { SuccessDataResponse } from 'src/infrastructure/logic/api-response.logic';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async saveOrUpdateUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
        try {
            const user: UserResponseModel = await this.userService.saveOrUpdateUser(createUserDto);

            return new SuccessDataResponse<UserResponseModel>(undefined, HttpStatus.OK, user).send(res);
        } catch (error) {
            console.log(error.stack);

            return ApiError.handle(error, res);
        }
    }

    @Get('/:cpf')
    async getUserByCpf(@Param('cpf') cpf: string, @Res() res: Response): Promise<Response> {
        try {
            cpf = Utils.removeSpecialCharacters(cpf);

            const user: UserResponseModel = await this.userService.getUserByCpf(cpf);

            return new SuccessDataResponse<UserResponseModel>(undefined, HttpStatus.OK, user).send(res);
        } catch (error) {
            console.log(error.stack);

            return ApiError.handle(error, res);
        }
    }

    @Get()
    async getUsers(@Res() res: Response): Promise<Response> {
        try {
            const user: UserResponseModel[] = await this.userService.getUsers();

            return new SuccessDataResponse<UserResponseModel[]>(undefined, HttpStatus.OK, user).send(res);
        } catch (error) {
            console.log(error.stack);

            return ApiError.handle(error, res);
        }
    }

    @Put('/:id')
    async updateUser(
        @Body() createUserDto: CreateUserDto,
        @Param('id') id: number,
        @Res() res: Response
    ): Promise<Response> {
        try {
            const user: UserResponseModel = await this.userService.updateUser(id, createUserDto);

            return new SuccessDataResponse<UserResponseModel>(undefined, HttpStatus.OK, user).send(res);
        } catch (error) {
            console.log(error.stack);

            return ApiError.handle(error, res);
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number, @Res() res: Response): Promise<Response> {
        try {
            await this.userService.deleteUser(id);

            return new SuccessDataResponse<void>(undefined, HttpStatus.OK, undefined).send(res);
        } catch (error) {
            console.log(error.stack);

            return ApiError.handle(error, res);
        }
    }
}

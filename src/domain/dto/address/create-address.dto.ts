import { IsNotEmpty } from 'class-validator';
import { Strings } from '../../shared/strings';

export class CreateUserDto {
    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('cep') })
    zipCode: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('logradouro') })
    street: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('cidade') })
    city: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('estado') })
    state: string;
}

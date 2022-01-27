import { IsNotEmpty } from 'class-validator';
import { Strings } from 'src/domain/shared/strings';

export class UserResponseModel {
    id: number;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('nome') })
    name: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('cpf') })
    cpf: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('telefone') })
    phone: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('cep') })
    zipCode: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('logradouro') })
    street: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('cidade') })
    city: string;

    @IsNotEmpty({ message: Strings.REQUIRED_FIELD('estado') })
    state: string;
}

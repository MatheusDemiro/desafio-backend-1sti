export const Strings = {
    GENERIC_SUCCESS: 'Operação realizada com sucesso.',
    GENERIC_ERROR: 'Desculpe ocorreu algum erro.',
    GENERIC_NOT_FOUND_ERROR: 'Recurso não encontrado.',
    GENERIC_BAD_REQUEST: 'A requisição não pôde ser processada pelo servidor.',
    GENERIC_CONFLICT_ERROR: 'Recurso já cadastrado.',

    NOT_FOUND_ADDRESS_ERROR: 'O CEP informado não foi não encontrado.',
    NOT_FOUND_USER_ERROR: 'Usuário não encontrado.',
    DUPLICATE_USER_ERROR: 'Usuário já cadastrado.',
    INVALID_ZIP_CODE_ERROR: 'CEP inválido. O CEP deve conter apenas números e um total de 8 dígitos.',
    INVALID_CPF_ERROR: 'CPF inválido.',

    REQUIRED_FIELD: (val: string) => `O campo '${val}' é obrigatório.`,
};

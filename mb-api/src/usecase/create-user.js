import { addUserDB, findUserByEmail, findUserByCNPJ, findUserByCPF } from "../repository/user.repository.js"

async function execute(body) {
    const { cpf, cnpj, email } = body
    const userExists = await findUserByEmail(email) || await findUserByCPF(cpf) || await findUserByCNPJ(cnpj)

    if (userExists) {
        throw new Error('Email ou CPF/CNPJ já está em uso.');
    }

    return addUserDB(body)
}

export default {
    execute
}
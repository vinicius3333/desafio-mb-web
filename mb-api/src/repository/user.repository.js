export async function findUserByEmail(email) {
    return email === "teste@teste.com"
}

export async function findUserByCPF(cpf) {
    return cpf === "46058148090"
}

export async function findUserByCNPJ(cnpj) {
    return cnpj === "43539932000110"
}

export async function addUserDB(userData) {
    const newUser = { id: Date.now(), ...userData }
    return newUser
}

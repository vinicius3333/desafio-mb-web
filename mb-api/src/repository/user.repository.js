export async function findUserByEmail(email) {
    return email === "teste@teste.com"
}

export async function findUserByCPF(cpf) {
    return cpf === "46058148090"
}

export async function findUserByCNPJ(cnpj) {
    return cnpj === "43539932000110"
}

const awaitTimeout = delay =>
    new Promise(resolve => setTimeout(resolve, delay))

export async function addUserDB(userData) {
    await awaitTimeout(500)
    const newUser = { id: Date.now(), ...userData }
    return newUser
}
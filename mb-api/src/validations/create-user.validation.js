function validateEmail(email) {
    return email.includes("@")
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "")
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let check1 = 11 - (sum % 11)
    if (check1 === 10 || check1 === 11) check1 = 0
    if (check1 !== parseInt(cpf.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    let check2 = 11 - (sum % 11)
    if (check2 === 10 || check2 === 11) check2 = 0
    return check2 === parseInt(cpf.charAt(10))
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, "");
    return /^(?:\d{10}|\d{11})$/.test(cleaned);
}

function validateCNPJ(cnpj) {
    const cleaned = cnpj.replace(/\D/g, "");

    if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) return false;

    const calcVerifier = (cnpj, pos) => {
        const weights = pos === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const sum = weights.reduce((acc, weight, i) => acc + parseInt(cnpj[i]) * weight, 0)
        const rest = sum % 11
        return rest < 2 ? 0 : 11 - rest
    };

    const d1 = calcVerifier(cleaned, 12)
    const d2 = calcVerifier(cleaned + d1, 13)

    return cleaned.endsWith(`${d1}${d2}`)
}

function validateDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number)

    if (!day || !month || !year) return false

    const date = new Date(year, month - 1, day)
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function validatePf(errors, body) {
    const { name, cpf, birthDate } = body

    if (!name) {
        errors.push({ field: "name", message: "Nome é obrigatório." })
    }

    if (!cpf) {
        errors.push({ field: "cpf", message: "CPF é obrigatório." })
    }

    if (!validateCPF(cpf)) {
        errors.push({ field: "cpf", message: "CPF está no formato inválido." })
    }

    if (!birthDate) {
        errors.push({ field: "birthDate", message: "Data de nascimento é obrigatório." })
    }

    if (!validateDate(birthDate)) {
        errors.push({ field: "birthDate", message: "Data de nascimento está no formato inválido." })
    }
}

function validatePj(errors, body) {
    const { legalName, cnpj, openingDate } = body

    if (!legalName) {
        errors.push({ field: "legalName", message: "Razão social é obrigatório." })
    }

    if (!cnpj) {
        errors.push({ field: "cnpj", message: "CNPJ é obrigatório." })
    }

    if (!validateCNPJ(cnpj)) {
        errors.push({ field: "cnpj", message: "CNPJ está no formato inválido." })
    }

    if (!openingDate) {
        errors.push({ field: "openingDate", message: "Data de abertura é obrigatório." })
    }

    if (!validateDate(openingDate)) {
        errors.push({ field: "openingDate", message: "Data de abertura está no formato inválido." })
    }
}

export function validateCreateUser(req, res, next) {
    const { phone, email, password, typePerson } = req.body

    const errors = []

    if (!email) {
        errors.push({ field: "email", message: "E-mail é obrigatório." })
    }

    if (!validateEmail(email)) { //  || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        errors.push({ field: "email", message: "E-mail está no formato inválido." })
    }

    if (!password) {
        errors.push({ field: "password", message: "Senha é obrigatório." })
    }

    if (!phone) {
        errors.push({ field: "phone", message: "Telefone é obrigatório." })
    }

    if (!validatePhone(phone)) {
        errors.push({ field: "phone", message: "Telefone está no formato inválido." })
    }

    if (!typePerson) {
        errors.push({ field: "typePerson", message: "Tipo de cadastro é obrigatório." })
    }

    if (typePerson === "pf") validatePf(errors, req.body)
    if (typePerson === "pj") validatePj(errors, req.body)

    if (errors.length > 0) {
        return res.status(400).json({ errors })
    }

    next()
}
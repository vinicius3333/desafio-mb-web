import { computed, ref } from 'vue'

function validateEmail(email) {
  return email.includes('@')
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
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
  const cleaned = phone.replace(/\D/g, '')
  return /^(?:\d{10}|\d{11})$/.test(cleaned)
}

function validateCNPJ(cnpj) {
  const cleaned = cnpj.replace(/\D/g, '')

  if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) return false

  const calcVerifier = (cnpj, pos) => {
    const weights =
      pos === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum = weights.reduce((acc, weight, i) => acc + parseInt(cnpj[i]) * weight, 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const d1 = calcVerifier(cleaned, 12)
  const d2 = calcVerifier(cleaned + d1, 13)

  return cleaned.endsWith(`${d1}${d2}`)
}

function validateDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)

  if (!day || !month || !year) return false

  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export function useValidate(formData) {
  const errors = ref({})

  const validation = {
    email: computed(() => {
      const errors = []

      if (formData.email.trim() === '') errors.push('E-mail é obrigatório.')
      if (!validateEmail(formData.email)) errors.push('E-mail está no formato inválido.')

      return errors
    }),
    typePerson: computed(() => {
      const errors = []

      if (formData.typePerson.trim() === '') errors.push('Tipo de cadastro é obrigatório.')

      return errors
    }),
    name: computed(() => {
      const errors = []

      if (formData.name.trim() === '') errors.push('Nome é obrigatório.')

      return errors
    }),
    legalName: computed(() => {
      const errors = []

      if (formData.legalName.trim() === '') errors.push('Razão social é obrigatória.')

      return errors
    }),
    phone: computed(() => {
      const errors = []

      if (formData.phone.trim() === '') errors.push('Telefone é obrigatório.')
      if (!validatePhone(formData.phone)) errors.push('Telefone está no formato inválido.')

      return errors
    }),
    cpf: computed(() => {
      const errors = []

      if (formData.cpf.trim() === '') errors.push('CPF é obrigatório.')
      if (!validateCPF(formData.cpf)) errors.push('CPF está no formato inválido.')

      return errors
    }),
    cnpj: computed(() => {
      const errors = []

      if (formData.cnpj.trim() === '') errors.push('CNPJ é obrigatório.')
      if (!validateCNPJ(formData.cnpj)) errors.push('CNPJ está no formato inválido.')

      return errors
    }),
    birthDate: computed(() => {
      const errors = []

      if (formData.birthDate.trim() === '') errors.push('Data de nascimento é obrigatório.')
      if (!validateDate(formData.birthDate))
        errors.push('Data de nascimento está no formato inválido.')

      return errors
    }),
    openingDate: computed(() => {
      const errors = []

      if (formData.openingDate.trim() === '') errors.push('Data de abertura é obrigatório.')
      if (!validateDate(formData.openingDate))
        errors.push('Data de abertura está no formato inválido.')

      return errors
    }),
    password: computed(() => {
      const errors = []

      if (formData.password.trim() === '') errors.push('Senha é obrigatória.')

      return errors
    }),
  }

  function validateInput(input) {
    if (!(input in validation)) return true

    const validationList = validation[input].value

    if (validationList.length === 0) {
      delete errors.value[input]
      return true
    }

    errors.value[input] = validationList[0]
    return false
  }

  function validateForm(inputList) {
    const inputListValidate = inputList.map((e) => validateInput(e)).filter((f) => !f)

    return inputListValidate.length === 0
  }

  return {
    validateForm,
    errors,
  }
}

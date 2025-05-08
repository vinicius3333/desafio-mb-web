import { describe, it, expect, beforeEach } from 'vitest'
import { useValidate } from '../useValidate'
import { reactive } from 'vue'

const emptyFormData = {
    email: '',
    typePerson: '',
    name: '',
    cpf: '',
    cnpj: '',
    birthDate: '',
    openingDate: '',
    phone: '',
    password: '',
    legalName: '',
}

describe('useValidate', () => {
    let formData = reactive(emptyFormData)
    let validate

    beforeEach(() => {
        formData = reactive(emptyFormData)
        validate = useValidate(formData)
    })

    it('should return errors for empty required fields', () => {
        const isValid = validate.validateForm(Object.keys(formData))
        expect(isValid).toBe(false)

        expect(validate.errors.value).toEqual({
            email: 'E-mail é obrigatório.',
            typePerson: 'Tipo de cadastro é obrigatório.',
            name: 'Nome é obrigatório.',
            legalName: 'Razão social é obrigatória.',
            phone: 'Telefone é obrigatório.',
            cpf: 'CPF é obrigatório.',
            cnpj: 'CNPJ é obrigatório.',
            birthDate: 'Data de nascimento é obrigatório.',
            openingDate: 'Data de abertura é obrigatório.',
            password: 'Senha é obrigatória.',
        })
    })

    it('should validate a complete and correct form', () => {
        formData = Object.assign(formData, {
            email: 'vinicius@mercadobitcoin.com',
            typePerson: 'pf',
            name: 'Vinícius',
            legalName: 'Empresa Ltda',
            phone: '11999999999',
            cpf: '52998224725',
            cnpj: '45655980000107',
            birthDate: '1999-07-30',
            openingDate: '2020-04-01',
            password: '123456',
        })

        const isValid = validate.validateForm(Object.keys(formData))
        expect(isValid).toBe(true)
        expect(validate.errors.value).toEqual({})
    })

    it('should return error for invalid email', () => {
        formData.email = 'invalid-email'
        validate.validateForm(['email'])

        expect(validate.errors.value.email).toBe('E-mail está no formato inválido.')
    })

    it('should return error for invalid CPF', () => {
        formData.cpf = '12345678910'
        validate.validateForm(['cpf'])

        expect(validate.errors.value.cpf).toBe('CPF está no formato inválido.')
    })

    it('should return error for invalid CNPJ', () => {
        formData.cnpj = '123'
        validate.validateForm(['cnpj'])

        expect(validate.errors.value.cnpj).toBe('CNPJ está no formato inválido.')
    })

    it('should return error for invalid phone number', () => {
        formData.phone = '1234'
        validate.validateForm(['phone'])

        expect(validate.errors.value.phone).toBe('Telefone está no formato inválido.')
    })

    it('should return error for invalid date', () => {
        formData.birthDate = '2024-02-30' // data inválida
        validate.validateForm(['birthDate'])

        expect(validate.errors.value.birthDate).toBe('Data de nascimento está no formato inválido.')
    })
})
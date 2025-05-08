import { describe, it, expect } from 'vitest'
import { maskCpf, maskCnpj, maskPhone } from '../useMask'

describe('maskCpf', () => {
    it('should apply mask correctly', () => {
        expect(maskCpf('12345678901')).toBe('123.456.789-01')
        expect(maskCpf('123.456.789-01')).toBe('123.456.789-01')
    })

    it('show apply mask when incomplete', () => {
        expect(maskCpf('12345')).toBe('123.45')
    })
})

describe('maskCnpj', () => {
    it('should apply cnpj mask correctly', () => {
        expect(maskCnpj('12345678000199')).toBe('12.345.678/0001-99')
        expect(maskCnpj('12.345.678/0001-99')).toBe('12.345.678/0001-99')
    })

    it('show apply mask when incomplete', () => {
        expect(maskCnpj('123456')).toBe('12.345.6')
    })
})

describe('maskPhone', () => {
    it('show apply mask when 10 digits', () => {
        expect(maskPhone('1123456789')).toBe('(11) 2345-6789')
    })

    it('show apply mask when 11 digits', () => {
        expect(maskPhone('11923456789')).toBe('(11) 92345-6789')
    })

    it('show apply mask when incomplete', () => {
        expect(maskPhone('11923')).toBe('(11) 923')
    })
})

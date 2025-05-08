import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ConfirmationStep from '../ConfirmationStep.vue'

describe('ConfirmationStep.vue', () => {
    const baseProps = {
        errors: {
            email: '',
            name: '',
            cpf: '',
            birthDate: '',
            legalName: '',
            cnpj: '',
            openingDate: '',
            phone: '',
            password: '',
        },
        loading: false,
    }

    const modelValue = {
        email: '',
        name: '',
        cpf: '',
        birthDate: '',
        legalName: '',
        cnpj: '',
        openingDate: '',
        phone: '',
        password: '',
        typePerson: 'pf'
    }

    it('should renders pf fields when typePerson is pf', () => {
        const wrapper = shallowMount(ConfirmationStep, {
            props: {
                ...baseProps,
                modelValue,
            }
        })


        expect(wrapper.findComponent({ name: 'BaseTitle' }).exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'BaseTitle' }).attributes().title).toBe('Revise suas informações')
        expect(wrapper.findComponent({ name: 'BaseTitle' }).attributes().textstart).toBe('4')

        expect(wrapper.find('#email-review').exists()).toBe(true)
        expect(wrapper.find('#email-review').attributes().title).toBe('Endereço de e-mail')

        expect(wrapper.find('#name-review').exists()).toBe(true)
        expect(wrapper.find('#name-review').attributes().title).toBe('Nome')
        expect(wrapper.find('#name-review').attributes().autocomplete).toBe('username')

        expect(wrapper.find('#cpf-review').exists()).toBe(true)
        expect(wrapper.find('#cpf-review').attributes().title).toBe('CPF')
        expect(wrapper.find('#cpf-review').attributes().mask).toBe('cpf')

        expect(wrapper.find('#birth-date-review').exists()).toBe(true)
        expect(wrapper.find('#birth-date-review').attributes().title).toBe('Data de nascimento')
        expect(wrapper.find('#birth-date-review').attributes().type).toBe('date')

        expect(wrapper.find('#legal-name-review').exists()).toBe(false)
    })

    it('should renders pj fields when typePerson is "pj"', () => {
        const wrapper = shallowMount(ConfirmationStep, {
            props: {
                ...baseProps,
                modelValue: {
                    ...modelValue,
                    typePerson: 'pj',
                },
            }
        })

        expect(wrapper.find('#legal-name-review').exists()).toBe(true)
        expect(wrapper.find('#cnpj-review').exists()).toBe(true)
        expect(wrapper.find('#opening-date').exists()).toBe(true)
        expect(wrapper.find('#cpf-review').exists()).toBe(false)
    })

    it('should emit submitForm when form submit', async () => {
        const wrapper = shallowMount(ConfirmationStep, {
            props: {
                ...baseProps,
                modelValue,
            }
        })

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.emitted('submitForm')).toBeTruthy()
    })

    it('should emit goBackStep when back button is clicked', async () => {
        const wrapper = shallowMount(ConfirmationStep, {
            props: {
                ...baseProps,
                modelValue,
            }
        })

        const backButton = wrapper.findAllComponents({ name: 'BaseButton' })[0]
        await backButton.trigger('click')

        expect(wrapper.emitted('goBackStep')).toBeTruthy()
    })
})

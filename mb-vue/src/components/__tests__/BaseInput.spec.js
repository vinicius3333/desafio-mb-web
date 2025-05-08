import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

describe('BaseInput', () => {
  let props = {
    id: 'name',
    title: 'Nome',
    type: 'text',
    max: '100',
  }

  beforeEach(() => {
    props = {
      id: 'name',
      title: 'Nome',
      type: 'text',
      max: '100',
    }
  })

  it('renders label and input correctly', () => {
    const wrapper = mount(BaseInput, {
      props,
    })

    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.exists()).toBe(true)
    expect(label.attributes('for')).toBe(props.id)
    expect(label.text()).toBe(props.title)

    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe(props.id)
    expect(input.attributes('name')).toBe(props.id)
    expect(input.attributes('type')).toBe(props.type)
    expect(input.attributes('title')).toBe(props.title)
    expect(input.attributes('max')).toBe(props.max)
  })

  it('changes v-model correctly', async () => {
    const wrapper = mount(BaseInput, {
      props,
    })

    const input = wrapper.find('input')
    await input.setValue('Mercado Bitcoin')

    expect(wrapper.vm.model).toBe('Mercado Bitcoin')
  })

  it('renders error correctly', () => {
    props = {
      id: 'name',
      title: 'Nome',
      type: 'text',
      max: '100',
      error: 'Campo é obrigatório.'
    }
    const wrapper = mount(BaseInput, { props })

    const small = wrapper.find('small')

    expect(small.exists()).toBe(true)
    expect(small.text()).toBe(props.error)
  })

  it('should change v-model with mask', async () => {
    props.mask = 'cpf'
    const wrapperCpf = mount(BaseInput, {
      props,
    })

    props.mask = 'cnpj'
    const wrapperCnpj = mount(BaseInput, {
      props,
    })

    props.mask = 'phone'
    const wrapperPhone = mount(BaseInput, {
      props,
    })

    const inputCpf = wrapperCpf.find('input')
    await inputCpf.setValue('12345678901')

    expect(wrapperCpf.vm.model).toBe('123.456.789-01')

    const inputCnpj = wrapperCnpj.find('input')
    await inputCnpj.setValue('12345678000199')

    expect(wrapperCnpj.vm.model).toBe('12.345.678/0001-99')

    const inputPhoneTen = wrapperPhone.find('input')
    await inputPhoneTen.setValue('1196632233')

    expect(wrapperPhone.vm.model).toBe('(11) 9663-2233')

    
    const inputPhoneEleven = wrapperPhone.find('input')
    await inputPhoneEleven.setValue('11996632233')

    expect(wrapperPhone.vm.model).toBe('(11) 99663-2233')
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import PfStep from '../PfStep.vue'

describe('PfStep.vue', () => {
  const props = {
    errors: {
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
    },
    modelValue: {
      name: '',
      cpf: '',
      birthDate: '',
      phone: '',
    },
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PfStep, {
      props,
    })
  })

  it('should renders correctly', () => {
    expect(wrapper.find('#name').exists()).toBe(true)
    expect(wrapper.find('#cpf').exists()).toBe(true)
    expect(wrapper.find('#birth-date').exists()).toBe(true)
    expect(wrapper.find('#phone').exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'BaseButton' }).length).toBe(2)
  })

  it('should emit validateStep when form submit', async () => {
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('validateStep')).toBeTruthy()
  })

  it('should emit goBackStep when back button is clicked', async () => {
    const backButton = wrapper.findAllComponents({ name: 'BaseButton' })[0]
    await backButton.trigger('click')

    expect(wrapper.emitted('goBackStep')).toBeTruthy()
  })
})

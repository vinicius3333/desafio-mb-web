import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PjStep from '../PjStep.vue'

describe('PjStep.vue', () => {
  const props = {
    errors: {
      legalName: '',
      cnpj: '',
      openingDate: '',
      phone: '',
    },
    modelValue: {
      legalName: '',
      cnpj: '',
      openingDate: '',
      phone: '',
    },
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PjStep, {
      props,
    })
  })

  it('should render correctly', () => {
    expect(wrapper.find('#legal-name-pj').exists()).toBe(true)
    expect(wrapper.find('#cnpj').exists()).toBe(true)
    expect(wrapper.find('#opening-date').exists()).toBe(true)
    expect(wrapper.find('#phone-pj').exists()).toBe(true)
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

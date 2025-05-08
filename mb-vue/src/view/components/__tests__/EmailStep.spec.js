import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import EmailStep from '../EmailStep.vue'

describe('EmailStep.vue', () => {
  const props = {
    errors: {
      email: '',
      typePerson: '',
    },
    modelValue: {
      email: '',
      typePerson: '',
    },
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(EmailStep, {
      props,
    })
  })

  it('renders input and radio group fields', () => {
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'InputRadioGroup' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'BaseButton' }).exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('should emit validateStep when form submit', async () => {
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('validateStep')).toBeTruthy()
  })
})

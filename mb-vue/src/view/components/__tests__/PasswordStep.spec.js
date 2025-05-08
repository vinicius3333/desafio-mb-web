import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PasswordStep from '../PasswordStep.vue'

describe('PasswordStep.vue', () => {
  const props = {
    errors: {
      password: '',
    },
    modelValue: {
      password: '',
    },
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PasswordStep, {
      props
    })
  })

  it('should render correctly', () => {
    expect(wrapper.find('#password').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(true)
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

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CreateUserWizard from '../CreateUserWizard.vue'

vi.mock('@/composables/useValidate', () => ({
  useValidate: () => ({
    errors: {},
    validateForm: vi.fn(() => true),
  }),
}))

const registerUserMock = vi.fn()
vi.mock('@/composables/useUserApi', () => ({
  useUserApi: () => ({
    registerUser: registerUserMock,
    loading: false,
  }),
}))

describe('CreateUserWizard.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(CreateUserWizard)
  })

  it('should render EmailStep correctly', () => {
    expect(wrapper.findComponent({ name: 'EmailStep' }).exists()).toBe(true)
  })

  it('should change to PfStep correctly', async () => {
    wrapper.vm.formData.typePerson = 'pf'
    await wrapper.findComponent({ name: 'EmailStep' }).trigger('validate-step')
    expect(wrapper.findComponent({ name: 'PfStep' }).exists()).toBe(true)
  })

  it('should change to PjStep correctly', async () => {
    wrapper.vm.formData.typePerson = 'pj'
    await wrapper.findComponent({ name: 'EmailStep' }).trigger('validate-step')
    expect(wrapper.findComponent({ name: 'PjStep' }).exists()).toBe(true)
  })

  it('should change to PasswordStep correctly with pf', async () => {
    wrapper.vm.currentStep = 1
    wrapper.vm.formData.typePerson = 'pf'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PfStep' }).trigger('validate-step')
    expect(wrapper.findComponent({ name: 'PasswordStep' }).exists()).toBe(true)
  })

  it('should change to PasswordStep correctly with pj', async () => {
    wrapper.vm.currentStep = 1
    wrapper.vm.formData.typePerson = 'pj'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PjStep' }).trigger('validate-step')
    expect(wrapper.findComponent({ name: 'PasswordStep' }).exists()).toBe(true)
  })

  it('should change to ConfirmationStep correctly', async () => {
    wrapper.vm.currentStep = 2
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PasswordStep' }).trigger('validate-step')
    expect(wrapper.findComponent({ name: 'ConfirmationStep' }).exists()).toBe(true)
  })

  it('should call submitForm correctly when pf', async () => {
    wrapper.vm.currentStep = 3
    wrapper.vm.formData.typePerson = 'pf'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'ConfirmationStep' }).trigger('submit-form')
    expect(registerUserMock).toBeCalled()
  })

  it('should call submitForm correctly when pj', async () => {
    wrapper.vm.currentStep = 3
    wrapper.vm.formData.typePerson = 'pj'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'ConfirmationStep' }).trigger('submit-form')
    expect(registerUserMock).toBeCalled()
  })

  it('should change to EmailStep when goBackStep event with pf', async () => {
    wrapper.vm.currentStep = 1
    wrapper.vm.formData.typePerson = 'pf'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PfStep' }).trigger('go-back-step')
    expect(wrapper.vm.currentStep).toBe(0)
    expect(wrapper.findComponent({ name: 'EmailStep' }).exists()).toBe(true)
  })

  it('should change to EmailStep when goBackStep event with pj', async () => {
    wrapper.vm.currentStep = 1
    wrapper.vm.formData.typePerson = 'pj'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PjStep' }).trigger('go-back-step')
    expect(wrapper.vm.currentStep).toBe(0)
    expect(wrapper.findComponent({ name: 'EmailStep' }).exists()).toBe(true)
  })

  it('should change to PfStep when goBackStep event', async () => {
    wrapper.vm.currentStep = 2
    wrapper.vm.formData.typePerson = 'pf'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PasswordStep' }).trigger('go-back-step')
    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.findComponent({ name: 'PfStep' }).exists()).toBe(true)
  })

  it('should change to PjStep when goBackStep event', async () => {
    wrapper.vm.currentStep = 2
    wrapper.vm.formData.typePerson = 'pj'
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'PasswordStep' }).trigger('go-back-step')
    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.findComponent({ name: 'PjStep' }).exists()).toBe(true)
  })

  it('should change to PasswordStep when goBackStep event', async () => {
    wrapper.vm.currentStep = 3
    await wrapper.vm.$nextTick()
    await wrapper.findComponent({ name: 'ConfirmationStep' }).trigger('go-back-step')
    expect(wrapper.vm.currentStep).toBe(2)
    expect(wrapper.findComponent({ name: 'PasswordStep' }).exists()).toBe(true)
  })
})

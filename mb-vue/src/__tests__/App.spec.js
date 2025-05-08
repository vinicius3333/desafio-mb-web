import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
    it('should render CreateUserWizard correctly', () => {
        const wrapper = shallowMount(App)
        expect(wrapper.findComponent({ name: 'CreateUserWizard' }).exists()).toBe(true)
    })
})

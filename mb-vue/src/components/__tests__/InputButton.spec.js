import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
    it('renders text correctly', () => {
        const wrapper = mount(BaseButton, { props: { text: 'Botão' } })
        expect(wrapper.text()).toContain('Botão')
    })

    it('renders outline correctly', () => {
        const wrapper = mount(BaseButton, { props: { outline: true } })
        expect(wrapper.classes()).toContain('primary-outline')
    })
})

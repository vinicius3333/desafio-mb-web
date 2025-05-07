import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputButton from '../InputButton.vue'

describe('InputButton', () => {
    it('renders text correctly', () => {
        const wrapper = mount(InputButton, { props: { text: 'Botão' } })
        expect(wrapper.text()).toContain('Botão')
    })

    it('renders outline correctly', () => {
        const wrapper = mount(InputButton, { props: { outline: true } })
        expect(wrapper.classes()).toContain('primary-outline')
    })
})

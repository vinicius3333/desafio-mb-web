import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputText from '../InputText.vue'

describe('InputText', () => {
    const props = {
        id: 'name',
        title: 'Nome',
        type: 'text',
        max: '100'
      }
    
      it('renders label and input correctly', () => {
        const wrapper = mount(InputText, {
          props
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
        const wrapper = mount(InputText, {
          props
        })
    
        const input = wrapper.find('input')
        await input.setValue('Mercado Bitcoin')
    
        expect(wrapper.vm.model).toBe('Mercado Bitcoin')
      })
})

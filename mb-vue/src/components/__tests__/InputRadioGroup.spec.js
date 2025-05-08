import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputRadioGroup from '../InputRadioGroup.vue'

describe('InputRadioGroup', () => {
  const list = [
    {
      id: 'arroz',
      name: 'comida',
      text: 'Arroz',
      checked: false,
    },
    {
      id: 'feijao',
      name: 'comida',
      text: 'Feijão',
      checked: true,
    },
  ]

  it('renders radio list correctly', () => {
    const wrapper = mount(InputRadioGroup, {
      props: {
        list,
      },
    })
    expect(wrapper.text()).toContain('Arroz')
    expect(wrapper.text()).toContain('Feijão')
  })

  it('renders default checked: true correctly', () => {
    const wrapper = mount(InputRadioGroup, {
      props: { list },
    })

    const inputs = wrapper.findAll('input[type="radio"]')
    const checkedInput = inputs.find((input) => input.element.checked)
    expect(checkedInput.element.id).toBe('feijao')
  })

  it('changes v-model correctly', async () => {
    const wrapper = mount(InputRadioGroup, {
      props: { list },
    })

    const inputToSelect = wrapper.find('input[id="arroz"]')
    await inputToSelect.setChecked()

    expect(wrapper.vm.model).toBe('arroz')
  })
})

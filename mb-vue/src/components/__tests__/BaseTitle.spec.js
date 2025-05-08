import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseTitle from '../BaseTitle.vue'

describe('BaseTitle', () => {
  it('renders title correctly', () => {
    const wrapper = mount(BaseTitle, { props: { title: 'Título' } })
    expect(wrapper.text()).toContain('Título')
  })

  it('renders default steps correctly', () => {
    const wrapper = mount(BaseTitle, { props: { title: 'Título' } })
    expect(wrapper.text()).toContain('Etapa 1 de 4')
  })

  it('renders custom steps correctly', () => {
    const wrapper = mount(BaseTitle, { props: { title: 'Título', textStart: '2', textEnd: '5' } })
    expect(wrapper.text()).toContain('Etapa 2 de 5')
  })

  it('span exists for highlight text', () => {
    const wrapper = mount(BaseTitle, { props: { title: 'Título' } })

    const span = wrapper.find('.base-title__step span')

    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('1')
  })
})

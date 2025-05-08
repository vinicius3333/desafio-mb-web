<template>
  <section class="section">
    <BaseTitle textStart="1" title="Seja bem vindo(a)" />
    <form novalidate class="form" @submit.prevent="$emit('validateStep')">
      <BaseInput
        id="email"
        title="Endereço de e-mail"
        type="email"
        v-model="model.email"
        :error="errors.email"
      />
      <InputRadioGroup
        text="type-person"
        :list="typePersonItems"
        v-model="model.typePerson"
        :error="errors.typePerson"
      />
      <BaseButton text="Continuar" type="submit" />
    </form>
  </section>
</template>

<script setup>
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import InputRadioGroup from '../../components/InputRadioGroup.vue'
import BaseTitle from '../../components/BaseTitle.vue'

import { ref } from 'vue'

defineEmits(['validateStep'])

defineProps({
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const typePersonItems = ref([
  {
    id: 'pf',
    name: 'typePerson',
    checked: false,
    text: 'Pessoa física',
  },
  {
    id: 'pj',
    name: 'typePerson',
    checked: false,
    text: 'Pessoa jurídica',
  },
])

const model = defineModel()
</script>

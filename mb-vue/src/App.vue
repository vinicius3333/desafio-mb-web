<template>
  <main>
    <div>
      <BaseTitle textStart="1" title="Seja bem vindo(a)" />
      <InputText id="email" title="Endereço de e-mail" />
      <InputRadioGroup text="Teste" :list="items" />
      <InputButton text="Continuar" />
    </div>
  </main>
</template>

<script setup>
import InputText from './components/InputText.vue'
import InputButton from './components/InputButton.vue'
import InputRadioGroup from './components/InputRadioGroup.vue'
import BaseTitle from './components/BaseTitle.vue'
import { ref } from 'vue'

const items = ref([
  {
    id: "pf",
    name: "typePerson",
    checked: false,
    text: "Pessoa física",
  },
  {
    id: "pj",
    name: "typePerson",
    checked: false,
    text: "Pessoa jurídica",
  }
])

</script>

<style scoped></style>

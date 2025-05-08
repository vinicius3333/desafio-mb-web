<template>
  <section class="section">
    <BaseTitle textStart="2" title="Pessoa Física" />
    <form novalidate class="form" @submit.prevent="$emit('validateStep')">
      <BaseInput id="name" title="Nome" v-model="model.name" :error="errors.name" />
      <BaseInput id="cpf" title="CPF" v-model="model.cpf" mask="cpf" :error="errors.cpf" />
      <BaseInput
        id="birth-date"
        title="Data de nascimento"
        v-model="model.birthDate"
        type="date"
        :max="new Date().toISOString().split('T')[0]"
        :error="errors.birthDate"
      />
      <BaseInput
        id="phone"
        title="Telefone"
        v-model="model.phone"
        mask="phone"
        :error="errors.phone"
      />

      <div class="button-group">
        <BaseButton text="Voltar" outline @click="$emit('goBackStep')" />
        <BaseButton text="Continuar" type="submit" />
      </div>
    </form>
  </section>
</template>

<script setup>
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import BaseTitle from '../../components/BaseTitle.vue'

defineEmits(['validateStep', 'goBackStep'])

defineProps({
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const model = defineModel()
</script>

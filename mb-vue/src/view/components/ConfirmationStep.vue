<template>
  <section class="section">
    <BaseTitle textStart="4" title="Revise suas informações" />
    <form novalidate class="form" @submit.prevent="$emit('submitForm')">
      <BaseInput
        id="email-review"
        title="Endereço de e-mail"
        v-model="model.email"
        :error="errors.email"
      />

      <template v-if="model.typePerson === 'pf'">
        <BaseInput
          id="name-review"
          title="Nome"
          v-model="model.name"
          :error="errors.name"
          autocomplete="username"
        />
        <BaseInput id="cpf-review" title="CPF" v-model="model.cpf" mask="cpf" :error="errors.cpf" />
        <BaseInput
          id="birth-date-review"
          title="Data de nascimento"
          v-model="model.birthDate"
          type="date"
          :max="new Date().toISOString().split('T')[0]"
          :error="errors.birthDate"
        />
      </template>

      <template v-if="model.typePerson === 'pj'">
        <BaseInput
          id="legal-name-review"
          title="Razão social"
          v-model="model.legalName"
          :error="errors.legalName"
          autocomplete="username"
        />
        <BaseInput
          id="cnpj-review"
          title="CNPJ"
          v-model="model.cnpj"
          :error="errors.cnpj"
          mask="cnpj"
        />
        <BaseInput
          id="opening-date"
          title="Data de abertura"
          v-model="model.openingDate"
          :error="errors.openingDate"
          type="date"
          :max="new Date().toISOString().split('T')[0]"
        />
      </template>

      <BaseInput
        id="phone-review"
        title="Telefone"
        v-model="model.phone"
        :error="errors.phone"
        mask="phone"
        autocomplete="phone"
      />
      <BaseInput
        id="password-review"
        title="Senha"
        type="password"
        v-model="model.password"
        :error="errors.password"
        autocomplete="new-password"
      />
      <div class="button-group">
        <BaseButton text="Voltar" :disabled="loading" outline @click="$emit('goBackStep')" />
        <BaseButton
          :text="loading ? 'Carregando' : 'Continuar'"
          :disabled="loading"
          type="submit"
        />
      </div>
    </form>
  </section>
</template>

<script setup>
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import BaseTitle from '../../components/BaseTitle.vue'

defineEmits(['submitForm', 'goBackStep'])

defineProps({
  errors: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel()
</script>

<template>
  <main class="main-app">
    <section class="main-app__block" v-show="currentStep === 0">
      <BaseTitle textStart="1" title="Seja bem vindo(a)" />
      <form class="form" @submit.prevent="currentStep++">
        <BaseInput id="email" title="Endereço de e-mail" type="email" v-model="formData.email" />
        <InputRadioGroup text="type-person" :list="items" v-model="formData.typePerson" />
        <BaseButton text="Continuar" type="submit" />
      </form>
    </section>

    <section class="main-app__block" v-show="currentStep === 1 && formData.typePerson === 'pf'">
      <BaseTitle textStart="2" title="Pessoa Física" />
      <form class="form" @submit.prevent="currentStep++">
        <BaseInput id="name" title="Nome" v-model="formData.name" />
        <BaseInput id="cpf" title="CPF" v-model="formData.cpf" />
        <BaseInput id="birth-date" title="Data de nascimento" v-model="formData.birthDate" type="date"
          :max="new Date().toISOString().split('T')[0]" />
        <BaseInput id="phone" title="Telefone" v-model="formData.phone" />

        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>


    <section class="main-app__block" v-show="currentStep === 1 && formData.typePerson === 'pj'">
      <BaseTitle textStart="2" title="Pessoa Jurídica" />
      <form class="form" @submit.prevent="currentStep++">
        <BaseInput id="name-pj" title="Razão social" v-model="formData.name" />
        <BaseInput id="cnpj" title="CNPJ" v-model="formData.cnpj" />
        <BaseInput id="opening-date" title="Data de abertura" v-model="formData.openingDate" type="date"
          :max="new Date().toISOString().split('T')[0]" />
        <BaseInput id="phone-pj" title="Telefone" v-model="formData.phone" />
        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>

    <section class="main-app__block" v-show="currentStep === 2">
      <BaseTitle textStart="3" title="Senha de acesso" />
      <form class="form" @submit.prevent="currentStep++">
        <BaseInput id="password" title="Sua senha" type="password" v-model="formData.password" />
        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>

    <section class="main-app__block" v-show="currentStep === 3">
      <BaseTitle textStart="4" title="Revise suas informações" v-model="formData.email" />
      <form class="form" @submit.prevent="submitForm()">
        <BaseInput id="email-review" title="Endereço de e-mail" v-model="formData.email" />

        <template v-if="formData.typePerson === 'pf'">
          <BaseInput id="name-review" title="Nome" v-model="formData.name" />
          <BaseInput id="cpf-review" title="CPF" v-model="formData.cpf" />
          <BaseInput id="birth-date-review" title="Data de nascimento" v-model="formData.birthDate"
            :max="new Date().toISOString().split('T')[0]" />
        </template>

        <template v-if="formData.typePerson === 'pj'">
          <BaseInput id="name-review" title="Razão social" v-model="formData.name" />
          <BaseInput id="cnpj-review" title="CNPJ" v-model="formData.cnpj" />
          <BaseInput id="opening-date-review" title="Data de abertura" v-model="formData.openingDate"
            :max="new Date().toISOString().split('T')[0]" />
        </template>

        <BaseInput id="phone-review" title="Telefone" v-model="formData.phone" />
        <BaseInput id="password-review" title="Senha" type="password" v-model="formData.password" />
        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import BaseInput from './components/BaseInput.vue'
import BaseButton from './components/BaseButton.vue'
import InputRadioGroup from './components/InputRadioGroup.vue'
import BaseTitle from './components/BaseTitle.vue'
import { reactive, ref } from 'vue'

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

let currentStep = ref(0)

const formData = reactive({
  email: "",
  typePerson: "",
  name: "",
  cpf: "",
  cnpj: "",
  birthDate: "",
  openingDate: "",
  phone: "",
  password: ""
})

function submitForm() {
  console.log('submit', formData)
}
</script>

<style lang="scss" scoped>
.main-app {
  display: flex;
  justify-content: center;

  &__block {
    max-width: 260px;
    width: 100%;

    .base-title {
      margin-bottom: 16px;
    }

    .input-text {
      margin-bottom: 16px;
    }

    .input-radio {
      margin-bottom: 16px;
    }

    .form {
      max-width: 260px;
      width: 100%;
    }

    .button-group {
      display: flex;

      .input-button:first-child {
        margin-right: 8px;
      }
    }
  }
}
</style>
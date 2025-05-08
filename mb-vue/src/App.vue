<template>
  <main class="main-app">
    <section class="main-app__block" v-if="currentStep === 0">
      <BaseTitle textStart="1" title="Seja bem vindo(a)" />
      <form
        novalidate
        class="form"
        @submit.prevent="validateForm(['email', 'typePerson']) && currentStep++"
      >
        <BaseInput
          id="email"
          title="Endereço de e-mail"
          type="email"
          v-model="formData.email"
          :error="errors.email"
        />
        <InputRadioGroup
          text="type-person"
          :list="typePersonItems"
          v-model="formData.typePerson"
          :error="errors.typePerson"
        />
        <BaseButton text="Continuar" type="submit" />
      </form>
    </section>

    <section class="main-app__block" v-if="currentStep === 1 && formData.typePerson === 'pf'">
      <BaseTitle textStart="2" title="Pessoa Física" />
      <form
        novalidate
        class="form"
        @submit.prevent="validateForm(['name', 'cpf', 'birthDate', 'phone']) && currentStep++"
      >
        <BaseInput id="name" title="Nome" v-model="formData.name" :error="errors.name" />
        <BaseInput id="cpf" title="CPF" v-model="formData.cpf" mask="cpf" :error="errors.cpf" />
        <BaseInput
          id="birth-date"
          title="Data de nascimento"
          v-model="formData.birthDate"
          type="date"
          :max="new Date().toISOString().split('T')[0]"
          :error="errors.birthDate"
        />
        <BaseInput
          id="phone"
          title="Telefone"
          v-model="formData.phone"
          mask="phone"
          :error="errors.phone"
        />

        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>

    <section class="main-app__block" v-if="currentStep === 1 && formData.typePerson === 'pj'">
      <BaseTitle textStart="2" title="Pessoa Jurídica" />
      <form
        novalidate
        class="form"
        @submit.prevent="
          validateForm(['legalName', 'cnpj', 'openingDate', 'phone']) && currentStep++
        "
      >
        <BaseInput
          id="legal-name-pj"
          title="Razão social"
          v-model="formData.legalName"
          :error="errors.legalName"
        />
        <BaseInput
          id="cnpj"
          title="CNPJ"
          v-model="formData.cnpj"
          mask="cnpj"
          :error="errors.cnpj"
        />
        <BaseInput
          id="opening-date"
          title="Data de abertura"
          v-model="formData.openingDate"
          :error="errors.openingDate"
          type="date"
          :max="new Date().toISOString().split('T')[0]"
        />
        <BaseInput
          id="phone-pj"
          title="Telefone"
          v-model="formData.phone"
          mask="phone"
          :error="errors.phone"
        />
        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>

    <section class="main-app__block" v-if="currentStep === 2">
      <BaseTitle textStart="3" title="Senha de acesso" />
      <form novalidate class="form" @submit.prevent="validateForm(['password']) && currentStep++">
        <BaseInput
          id="password"
          title="Sua senha"
          type="password"
          v-model="formData.password"
          :error="errors.password"
        />
        <div class="button-group">
          <BaseButton text="Voltar" outline @click="() => currentStep--" />
          <BaseButton text="Continuar" type="submit" />
        </div>
      </form>
    </section>

    <section class="main-app__block" v-if="currentStep === 3">
      <BaseTitle textStart="4" title="Revise suas informações" />
      <form novalidate class="form" @submit.prevent="submitForm()">
        <BaseInput
          id="email-review"
          title="Endereço de e-mail"
          v-model="formData.email"
          :error="errors.email"
        />

        <template v-if="formData.typePerson === 'pf'">
          <BaseInput id="name-review" title="Nome" v-model="formData.name" :error="errors.name" />
          <BaseInput
            id="cpf-review"
            title="CPF"
            v-model="formData.cpf"
            mask="cpf"
            :error="errors.cpf"
          />
          <BaseInput
            id="birth-date-review"
            title="Data de nascimento"
            v-model="formData.birthDate"
            type="date"
            :max="new Date().toISOString().split('T')[0]"
            :error="errors.birthDate"
          />
        </template>

        <template v-if="formData.typePerson === 'pj'">
          <BaseInput
            id="legal-name-review"
            title="Razão social"
            v-model="formData.legalName"
            :error="errors.legalName"
          />
          <BaseInput
            id="cnpj-review"
            title="CNPJ"
            v-model="formData.cnpj"
            :error="errors.cnpj"
            mask="cnpj"
          />
          <BaseInput
            id="opening-date"
            title="Data de abertura"
            v-model="formData.openingDate"
            :error="errors.openingDate"
            type="date"
            :max="new Date().toISOString().split('T')[0]"
          />
        </template>

        <BaseInput
          id="phone-review"
          title="Telefone"
          v-model="formData.phone"
          :error="errors.phone"
          mask="phone"
        />
        <BaseInput
          id="password-review"
          title="Senha"
          type="password"
          v-model="formData.password"
          :error="errors.password"
        />
        <div class="button-group">
          <BaseButton text="Voltar" :disabled="loadingUser" outline @click="() => currentStep--" />
          <BaseButton
            :text="loadingUser ? 'Carregando' : 'Continuar'"
            :disabled="loadingUser"
            type="submit"
          />
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
import { useValidate } from './composables/useValidate'
import { useUserApi } from './composables/useUserApi'

const { registerUser, loading: loadingUser } = useUserApi()

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

let currentStep = ref(0)

const formData = reactive({
  email: '',
  typePerson: '',
  name: '',
  cpf: '',
  cnpj: '',
  birthDate: '',
  openingDate: '',
  phone: '',
  password: '',
  legalName: '',
})

const { validateForm, errors } = useValidate(formData)

function submitForm() {
  let isFormValid = false

  if (formData.typePerson === 'pf') {
    isFormValid = validateForm(['email', 'name', 'cpf', 'birthDate', 'phone', 'password'])
  }

  if (formData.typePerson === 'pj') {
    isFormValid = validateForm(['email', 'legalName', 'cnpj', 'openingDate', 'phone', 'password'])
  }

  if (!isFormValid) return

  registerUser(formData)
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

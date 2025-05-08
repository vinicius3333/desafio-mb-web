<template>
    <EmailStep v-if="currentStep === 0" @validate-step="validateStep(['email', 'typePerson'])" v-model="formData"
        :errors="errors" />

    <PfStep v-if="currentStep === 1 && formData.typePerson === 'pf'"
        @validate-step="validateStep(['name', 'cpf', 'birthDate', 'phone'])" v-model="formData" :errors="errors"
        @go-back-step="() => currentStep--" />

    <PjStep v-if="currentStep === 1 && formData.typePerson === 'pj'"
        @validate-step="validateStep(['legalName', 'cnpj', 'openingDate', 'phone'])" v-model="formData" :errors="errors"
        @go-back-step="() => currentStep--" />

    <PasswordStep v-if="currentStep === 2" @validate-step="validateStep(['password'])" v-model="formData"
        :errors="errors" @go-back-step="() => currentStep--" />

    <ConfirmationStep v-if="currentStep === 3" @submit-form="submitForm()" v-model="formData" :errors="errors" :loading="loadingUser"
        @go-back-step="() => currentStep--" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useValidate } from '../composables/useValidate'
import { useUserApi } from '../composables/useUserApi'

import EmailStep from './components/EmailStep.vue'
import PfStep from './components/PfStep.vue'
import PjStep from './components/PjStep.vue'
import PasswordStep from './components/PasswordStep.vue'
import ConfirmationStep from './components/ConfirmationStep.vue'

const { registerUser, loading: loadingUser } = useUserApi()

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

function validateStep(inputList) {
    if (validateForm(inputList)) {
        currentStep.value++
    }
}

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

<style lang="scss">
.section {
    max-width: 260px;
    width: 100%;

    .base-title {
        margin-bottom: 16px;
    }

    .form {
        max-width: 260px;
        width: 100%;

        .input-text {
            margin-bottom: 16px;
        }

        .input-radio {
            margin-bottom: 16px;
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
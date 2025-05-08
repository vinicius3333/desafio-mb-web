<template>
    <section class="section">
        <BaseTitle textStart="2" title="Pessoa Jurídica" />
        <form novalidate class="form" @submit.prevent="$emit('validateStep')">
            <BaseInput id="legal-name-pj" title="Razão social" v-model="model.legalName" :error="errors.legalName" />
            <BaseInput id="cnpj" title="CNPJ" v-model="model.cnpj" mask="cnpj" :error="errors.cnpj" />
            <BaseInput id="opening-date" title="Data de abertura" v-model="model.openingDate"
                :error="errors.openingDate" type="date" :max="new Date().toISOString().split('T')[0]" />
            <BaseInput id="phone-pj" title="Telefone" v-model="model.phone" mask="phone" :error="errors.phone" />
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
        default: () => ({})
    }
})

const model = defineModel()
</script>
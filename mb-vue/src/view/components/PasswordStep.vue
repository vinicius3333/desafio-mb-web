<template>
    <section class="section">
        <BaseTitle textStart="3" title="Senha de acesso" />
        <form novalidate class="form" @submit.prevent="$emit('validateStep')">
            <BaseInput id="user" type="text" v-show="false" autocomplete="username" />
            <BaseInput id="password" title="Sua senha" type="password" v-model="model.password"
                :error="errors.password" autocomplete="new-password" />
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
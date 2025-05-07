<template>
    <div class="input-text">
        <label class="input-text__label" :for="id">{{ title }}</label>
        <input ref="base-input" class="input-text__field" :id="id" :name="id" :type="type" :title="title"
            v-model="localModel" required :max="max" />
    </div>
</template>

<script setup>
import { maskCnpj, maskCpf, maskPhone } from '@/composables/useMask'
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: "text"
    },
    max: {
        type: String,
        required: false
    },
    mask: {
        type: String,
        required: false,
        validator(value) {
            if (!value) return false
            return ['cpf', 'cnpj', 'phone'].includes(value)
        },
        default: null
    }
})

const baseInputRef = useTemplateRef("base-input");

function validateInput() {
    console.log(baseInputRef.value)
}

defineExpose({ validateInput })

const model = defineModel()
const localModel = ref(model.value)

watch(localModel, (val) => {
    if (props.mask === 'cpf') {
        localModel.value = maskCpf(val)
    }

    if (props.mask === 'cnpj') {
        localModel.value = maskCnpj(val)
    }

    if (props.mask === 'phone') {
        localModel.value = maskPhone(val)
    }

    model.value = localModel.value
})
</script>

<style lang="scss" scoped>
.input-text {
    display: flex;
    flex-direction: column;

    &__label {
        color: #090909;
        margin-bottom: 8px;
    }

    &__field {
        border: 1px solid #090909;
        border-radius: 4px;
        padding: 4px;

        &:focus {
            outline: none;
        }
    }
}
</style>

<template>
    <div class="input-text">
        <label class="input-text__label" :for="id">{{ title }}</label>
        <input class="input-text__field" :id="id" :name="id" :type="type" :title="title" v-model="model" required :max="max" />
    </div>
</template>

<script setup>
defineProps({
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
    }
})

let model = defineModel()
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

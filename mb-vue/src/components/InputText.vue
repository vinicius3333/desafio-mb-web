<template>
    <div class="input-text">
        <label class="input-text__label" :for="id">{{ title }}</label>
        <input class="input-text__field" :id="id" :name="id" type="email" :title="title" />
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

        &:focus {
            outline: none;
        }
    }
}
</style>

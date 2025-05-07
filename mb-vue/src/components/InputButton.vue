<template>
    <button class="input-button" :type="type">
        {{  text  }}
    </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "button"
  }
})
</script>

<style lang="scss" scoped>
.input-button {
    font-weight: 300;
    background-color: #FF9900;
    color: white;
    border-radius: 4px;
    width: 100%;
    border: none;
    cursor: pointer;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 8px 0;

    &:active {
        background-color: #e69419;
    }
}
</style>

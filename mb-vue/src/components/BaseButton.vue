<template>
  <button :class="['input-button', outlineClass]" :type="type" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  outline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const outlineClass = computed(() => {
  if (props.outline) {
    return 'primary-outline'
  }

  return 'primary'
})
</script>

<style lang="scss" scoped>
.input-button {
  font-weight: 300;
  border-radius: 4px;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 8px 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &.primary {
    background-color: #ff9900;
    color: #f5f5f5;

    &:active {
      background-color: #e69419;
    }
  }

  &.primary-outline {
    background-color: #f5f5f5;
    color: #ff9900;
    border: 1px solid #ff9900;

    &:active {
      background-color: #ff9900;
      color: #f5f5f5;
    }
  }
}
</style>

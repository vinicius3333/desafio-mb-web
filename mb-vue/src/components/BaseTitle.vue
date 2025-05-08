<template>
  <div class="base-title">
    <p class="base-title__step">
      Etapa <span>{{ textStart }}</span> de {{ textEnd }}
    </p>
    <h2 class="base-title__sub">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  textStart: {
    type: String,
    default: '1',
  },
  textEnd: {
    type: String,
    default: '4',
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.base-title {
  &__step {
    margin-bottom: 8px;

    > span {
      color: #ff9900;
    }
  }
}
</style>

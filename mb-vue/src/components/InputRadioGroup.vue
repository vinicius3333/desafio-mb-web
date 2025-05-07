<template>
  <fieldset class="input-radio">
    <div v-for="(item) in list" class="input-radio__item">
      <input type="radio" :id="item.id" :name="item.name" :value="item.id" .checked="item.checked" />
      <label :for="item.id">{{ item.text }}</label>
    </div>
  </fieldset>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: false,
  },
  list: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.input-radio {
    display: flex;
    flex-direction: row;

    &__item:not(:last-child) {
      padding-right: 8px;
    }
}
</style>
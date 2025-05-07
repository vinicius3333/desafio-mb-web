<template>
  <fieldset class="input-radio">
    <div v-for="(item) in list" class="input-radio__item">
      <input class="input-radio__field" type="radio" :id="item.id" :name="item.name" :value="item.id"
        .checked="item.checked" v-model="model" required />
      <label class="input-radio__label" :for="item.id">{{ item.text }}</label>
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

let model = defineModel()
</script>

<style lang="scss" scoped>
.input-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__item {
    display: flex;
  }

  &__field {
    cursor: pointer;
  }

  &__label {
    padding-left: 4px;
    cursor: pointer;
  }
}
</style>
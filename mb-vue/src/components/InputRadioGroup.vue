<template>
  <div class="input-radio">
    <fieldset class="input-radio__block">
      <div v-for="(item) in list" class="input-radio__item">
        <input class="input-radio__field" type="radio" :id="item.id" :name="item.name" :value="item.id"
           v-model="model" required />
        <label class="input-radio__label" :for="item.id">{{ item.text }}</label>
      </div>
    </fieldset>
    <small class="input-radio__error" v-if="error">
      {{ error }}
    </small>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    required: true
    // [
    //   {
    //     id: String,
    //     name: String,
    //     text: String,
    //     checked: Boolean
    //   }
    // ]
  },
  error: {
    type: String,
    required: false
  }
})

let model = defineModel()
</script>

<style lang="scss" scoped>
.input-radio {
  &__block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

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

  &__error {
    color: rgb(238, 0, 0);
  }
}
</style>
<template>
  <div class="form-radio">
    <div class="placeholder">
      {{ question.text }}
    </div>

    <label 
    class="mdl-radio mdl-js-radio"
    style="margin-right: 10px;"
    v-for="posibility in question.posibility" 
    :key="posibility.value">
      <input 
        class="mdl-radio__button"
        :value="posibility.value" 
        type="radio"
        :checked="value == posibility.value"
        @change="onClick(posibility.value)"
      >
      <span class="mdl-radio__label">{{ posibility.text }}</span>
      
    </label> 
  </div>
</template>

<script>
 export default {
     name: 'form-radio',
     data() {
         return {
            checked: undefined,
         };
     },

     props: {
       question: undefined,
       value: {
        type: undefined,
        default: undefined,
      },
     },

     methods: {
         onClick(value) {
            this.$emit('input', value);
         },
     },
 };
</script>
<template>
  <div class="input-container radio">
    <div class="placeholder">
      {{ question.text }}
    </div>

    <label 
    v-for="posibility in question.posibility" 
    :key="posibility.value">
      <input 
        :value="posibility.value" 
        type="radio"
        :checked="value == posibility.value"
        @change="onClick(posibility.value)"
      >
      {{ posibility.text }}
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
           console.log('value::', value);
           
            this.$emit('input', value);
         },
     },
 };
</script>
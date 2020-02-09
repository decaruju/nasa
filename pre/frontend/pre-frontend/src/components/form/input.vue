<template>
    <div class="input-container">
      <div class="input-with-placeholder">
          <input type="text" @input="onInput">
          <div class="placeholder">
            {{ question.text }}
          </div>
      </div>
    </div>
</template>

<script>
 export default {
     name: 'form-input',
     data() {
         return {
            
         };
     },

     props: {
       question: undefined,
     },

     methods: {
         onInput(event) {
           console.log('value::', event.target.value);
           
            this.$emit('input', event.target.value);
         },
     },
 };
</script>

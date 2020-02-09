<template>
    <div class="input-container">
      <div class="input-with-placeholder">
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
         onInput(value) {
            this.$emit('input', value);
         },
     },
 };
</script>

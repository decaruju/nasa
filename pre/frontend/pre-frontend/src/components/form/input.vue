<template>
  <div>
    <div class="textfield">
      <input class="input" type="text" @input="onInput" :id="question.id">
      <label class="placeholder" :for="question.id">{{ question.text }}</label>
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

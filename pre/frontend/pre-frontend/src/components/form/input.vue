<template>
  <div>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" @input="onInput" :id="question.id">
      <label class="mdl-textfield__label" :for="question.id">{{ question.text }}</label>
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

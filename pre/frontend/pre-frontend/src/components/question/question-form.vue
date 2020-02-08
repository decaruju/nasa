<template>
    <div>
        <label v-for="question in questions" :key="question.id">
            <div>
                {{ question.text }}
            </div>
            <input type="text" v-model="form[question.id]">
        </label>
      {{ form }}
      {{ questions }}
    </div>
</template>

<script>
 import axios from 'axios';

 export default {
     name: 'question-form',
     data() {
         return {
             form: {},
             questions: [],
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/questions');
         this.questions = response.data;
     },
     methods:  {
         send() {
             axios.post('http://localhost:8081/answers', { answers: this.form });
         }
     }
 }
</script>

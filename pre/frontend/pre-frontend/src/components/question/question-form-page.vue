<template>
    <div>
        <question-form v-model="form" :questions="questions" />

        <div>
            <button @click="send">
                Envoyer les informations supplémentaires.
            </button>
        </div>
    </div>
</template>

<script>
 import axios from 'axios';
 import questionForm from './question-form';

 export default {
     name: 'question-form-page',
     components: {
        questionForm,
     },
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
         async send() {
             await axios.post('http://localhost:8081/answers', { id: this.$route.params.id, answers: this.form });
             this.$router.push(`/image/${this.$route.params.id}`)
         }
     }
 }
</script>

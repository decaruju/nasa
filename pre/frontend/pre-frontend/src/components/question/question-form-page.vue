<template>
    <div>
        <div>
            <label v-for="question in questions" :key="question.id">
                <div>
                    {{ question.text }}
                </div>
                <input type="text" v-model="form[question.id]">
            </label>
        </div>
        <div>
            <button @click="send">
                Envoyer les informations supplémentaires.
            </button>
        </div>
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
         async send() {
             await axios.post('http://localhost:8081/answers', { id: this.$route.params.id, answers: this.form });
             this.$router.push(`/image/${this.$route.params.id}`)
         }
     }
 }
</script>

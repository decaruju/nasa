<template>
    <div class="requests">
      <div v-if="address">
        <div>
          <div v-for="question in questions" :key="question.id">
            <component :is="getComponent(question.type)" v-model="answers[question.id]" :question="question" />
          </div>
          <button @click="send" class="mdl-button mdl-button--raise mdl-button--colored">
            Envoyer la demande
          </button>
        </div>
      </div>
      <div v-else>
        <address-input @input="onInput" />
      </div>
    </div>
</template>

<script>
import AddressInput from '../address/address-input.vue';
import axios from 'axios';
import Helper from '../../shared/helper';
import store from '../../shared/store';
import formFactory from '../form/factory';

 export default {
    name: 'request',

    data() {
        return {
            address: undefined,
            questions: undefined,
            answers: {},
        };
    },

    components: {
        ...formFactory.components,
        AddressInput,
    },

    async created() {
      if(store.address) {
        this.onInput(store.address);
      }
    },

    methods: {
      getComponent(type) {
        return formFactory.component(type);
      },
      
      async onInput(address) {
        store.address = address;
        const response = await axios.post('http://localhost:8081/possible_requests', { address: Helper.getPosition(address) });
        this.address = address;
        this.questions = response.data.payload;
      },

      async send() {
        await axios.post('http://localhost:8081/request', { request: this.form });
        this.$router.push(`/`)
      },
    },
 }
</script>

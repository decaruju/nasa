<template>
    <div class="requests">
      <div v-if="address">
        <div>
          <div v-for="question in questions" :key="question.id">
            <component :is="getComponent(question.type)" v-model="answers[question.id]" :question="question" />
        </div>
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
import formFactory from '../form/factory';

console.log(formFactory.components);

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
      console.log('passe ici');
      
      const address = {
        geometry: {
          location: {
            lng: () => (-72.73946339999999), lat:() => (46.5212592),
          },
        },
      };
      const response = await axios.post('http://localhost:8081/possible_requests', { address: Helper.getPosition(address) });
      this.address = address;
      this.questions = response.data.payload;
    },

    methods: {
      getComponent(type) {
        return formFactory.component(type);
      },
      
      async onInput(address) {
        const response = await axios.post('http://localhost:8081/possible_requests', { address: Helper.getPosition(address) });
        this.address = address;
        this.questions = response.data.payload;
      },

    },
 }
</script>

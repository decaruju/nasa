<template>
<div>
<GmapMap
    :center="center"
    :zoom="16"
    map-type-id="terrain"
>

<GmapMarker
    v-for="(address, index) in addresses"
    :key="index"
    @click="placeChanged({
        geometry: {
            location: { lat: () => address.lat, lng: () => address.lng },
        }
    })"
    :position="{ lat: address.lat, lng: address.lng }"
    :clickable="true"
    title="foobar"
>
</GmapMarker>

</GmapMap>

<div style="margin: 20px;">
    <address-input @input="placeChanged" />

    <question-form v-if="address" v-model="form" :questions="questions" />

    <div>
    <button @click="send" class="mdl-button mdl-button--raise mdl-button--colored" style="margin-top: 20px;">
        Envoyer les informations supplémentaires.
    </button>
    </div>
    </div>
</div>
</template>

<script>
 import axios from 'axios';
 import QuestionForm from '../question/question-form';
 import AddressInput from '../address/address-input';

 export default {
     name: 'admin-page',
     components: { QuestionForm, AddressInput, },
     data() {
         return {
             data: [],
             center: { lat: 46.545304, lng: -72.750642 },
             addresses: [],
             address: undefined,
             form: {},
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/admin');
         
         this.addresses = response.data.map((item) => {
            return { lat: parseFloat(item.lat), lng: parseFloat(item.lng) };
         });
     },
     methods: {
        async placeChanged(address) {
            console.log('passe ici', address);
            
            const response = await axios.get('http://localhost:8081/questions');
            const answers = await axios.get('http://localhost:8081/answers', {
                params: this.getPosition(address),
            });

            this.form = answers.data[0] || {};
            this.address = address;
            this.questions = response.data;
        },

        async send() {
            await axios.post(
                'http://localhost:8081/answers', 
                { 
                    answers: this.form, 
                    ...this.getPosition(this.address),
                }
            );
        },

        getPosition(address) {
            return {
                lng: address.geometry.location.lng(),
                lat: address.geometry.location.lat(),
            };
        },
     },
 };
</script>

<style>
</style>

<template>
    <div>
        <GmapMap
            :center="center"
            :zoom="16"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
        >
            <GmapMarker
                v-for="(address, index) in addresses"
                :key="index"
                :position="{ lat: address.lat, lng: address.lng }"
                :clickable="true"
                title="foobar"
            >
            </GmapMarker>
        </GmapMap>
        Entrez votre addresse.

        <gmap-autocomplete
          @place_changed="placeChanged">
        </gmap-autocomplete>

        <question-form v-if="address" v-model="form" :questions="questions" />

        <div>
            <button @click="send">
                Envoyer les informations supplémentaires.
            </button>
        </div>
    </div>
</template>

<script>
 import axios from 'axios';
 import QuestionForm from '../question/question-form';

 export default {
     name: 'admin-page',
     components: { QuestionForm },
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
            this.address = undefined;
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

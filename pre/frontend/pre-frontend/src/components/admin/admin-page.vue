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
                :position="{ lat: address.latitude, lng: address.longitude }"
                :clickable="true"
                @click="onClick(index)"
                title="foobar"
            >
            </GmapMarker>
        </GmapMap>
        Entrez votre addresse.

        <gmap-autocomplete
          @place_changed="placeChanged">
        </gmap-autocomplete>

        <question-form v-if="address" v-model="form" :questions="questions" />
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
         this.data = response.data;
         this.addresses = this.data.map((d) => d.address);
     },
     methods: {
        async placeChanged(address) {
            this.address = undefined;
            const response = await axios.get('http://localhost:8081/questions');
            this.address = address;
            this.questions = response.data;
        },
     },
 };
</script>

<style>
</style>

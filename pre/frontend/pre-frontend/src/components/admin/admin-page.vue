<template>
    <div>
        <GmapMap
            :center="{ lat: 46.545304, lng: -72.750642 }"
            :zoom="16"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
        >
            <GmapMarker
                v-for="(address, index) in addresses"
                :key="index"
                :position="{ lat: address.latitude, lng: address.longitude }"
            >
            </GmapMarker>
        </GmapMap>
        Entrez votre addresse.
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
        />
    </div>
</template>

<script>
 import VueGoogleAutocomplete from 'vue-google-autocomplete';
 import axios from 'axios';
 export default {
     name: 'admin-page',
     components: { VueGoogleAutocomplete },
     data() {
         return {
             data: [],
             addresses: [],
             address: undefined,
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/admin');
         console.log(response)
         this.data = response.data;
         this.addresses = this.data.map((d) => d.address);
     },
     methods: {
        async placeChanged(address) {
            this.address = address;
        },
     },
 };
</script>

<style>
</style>

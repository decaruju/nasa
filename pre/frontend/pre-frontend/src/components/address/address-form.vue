<template>
    <div>
     <GmapMap
        :center="center"
        :zoom="16"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
    <template v-if="regions">
        <GmapPolygon  v-for="(path, index) in regions" :key="index" :paths="path" />
    </template>

    <GmapMarker
        v-if="address"
        :position="center"
    />

    </GmapMap>

        Entrez votre addresse.

        <address-input @input="onInput" />

        <div class="address-info" v-if="address">
            <div>
                address : {{ address.formatted_address }}
            </div>
        </div>

        <div>
            {{inRisk}}
        </div>
        <div v-if="address" class="button-container">
            <button @click="submit">
                Confirmer
            </button>
        </div>
    </div>
</template>

<script>
import AddressInput from './address-input.vue';
 import axios from 'axios';

 export default {
     name: 'address-form',

     data() {
         return {
            center: { lat: 46.545304, lng: -72.750642 },
            address: undefined,
            inRisk: undefined,
            regions: undefined,
         };
     },

     async created() {
        
         const response = await axios.get('http://localhost:8081/flooding_risk/shawinigan'); 
         console.log("passe ici");
         this.regions = response.data.maps;

         console.log('this.paths::', this.regions);
         
     },

     components: {
         AddressInput
     },

     methods: {
         onInput(address) {  
             console.log('address::', address);
                        
             this.address = address;
             this.center = { 
                 lat: this.address.geometry.location.lat(), 
                 lng: this.address.geometry.location.lng() };
         },

         async submit() {
             const response = await axios.post(
                'http://localhost:8081/in_risk', 
                { address: this.getPosition(this.address) }
            );

             this.inRisk = response.data.inRisk;
             //this.$router.push(`question/${response.data.id}`)
         },

         getPosition(address) {
            console.log(address);
            return {
                lng: address.geometry.location.lng(),
                lat: address.geometry.location.lat(),
            };
        },
     },
 }
</script>

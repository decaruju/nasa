<template>
    <div>

        Entrez votre addresse.

        <address-input @input="onInput" />

        <div class="address-info" v-if="address">
            <div>
                address : {{ address.formatted_address }}
            </div>
        </div>

        <div v-if="inRisk !== undefined">
            {{inRisk ? 'Vous êtes à risque' : "vous n'êtes pas à risque"}}
        </div>
        <div v-if="inRisk" class="button-container">
            <button @click="submit">
                S'inscrire
            </button>
        </div>
     <GmapMap
        :center="center"
        :zoom="16"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
    <template v-if="regions">
        <GmapPolygon  v-for="(path, index) in regions" :key="index" :paths="path" />
    </template>
    <GmapPolyline
        v-if="closest"
        :path="[center, closest]"
    />

    <GmapMarker
        v-if="address"
        :position="center"
    />

    </GmapMap>
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
             closest: undefined,
             showAnyway: false,
         };
     },

     async created() {
         const response = await axios.get('http://localhost:8081/flooding_risk');
         this.regions = response.data.maps;
     },

     components: {
         AddressInput
     },

     methods: {
         async onInput(address) {
             console.log('address::', address);
             this.address = address;
             this.center = {
                 lat: this.address.geometry.location.lat(),
                 lng: this.address.geometry.location.lng()
            };
            const response = await axios.post(
                'http://localhost:8081/in_risk',
                { address: this.getPosition(this.address) }
            );
            this.inRisk = response.data.inRisk;
             this.closest = undefined;
             if (!this.inRisk) {
                 this.closest = response.data.floodability.point;
                 this.closest = { lat: this.closest[1], lng: this.closest[0] };
             }
         },

         async submit() {
             this.$router.push(`question/${1}`)
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

<template>
    <div>
     <GmapMap
        :center="{ lat: 46.545304, lng: -72.750642 }"
        :zoom="16"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
    <template v-if="regions">
        <GmapPolygon  v-for="(path, index) in regions" :key="index" :paths="path" />
    </template>

    </GmapMap>

        Entrez votre addresse.

        <address-input @input="onInput" />

        <div class="address-info" v-if="address">
            <div>
                Ville : {{ address.locality }}
            </div>
            <div>
                Province: {{ address.administrative_area_level_1 }}
            </div>
            <div>
                Addresse: {{ address.street_number }} {{ address.route }}
            </div>
            <div>
                Code postal: {{ address.postal_code }}
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
             console.log('onInput');
             
             this.address = address;
         },
         async submit() {
             const response = await axios.post('http://localhost:8081/in_risk', { address: this.address });

             this.inRisk = response.data.inRisk;
             //this.$router.push(`question/${response.data.id}`)
         },
     }
 }
</script>

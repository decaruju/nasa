<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="16"
      map-type-id="terrain"
    >
    <template v-if="regions">
        <GmapPolygon v-for="(path, index) in regions" :key="index" :paths="path" />
    </template>

    <GmapMarker
    v-if="address"
    :position="center"
    />
      <GmapPolyline :path="[center, closest]" />
    </GmapMap>

    <div style="margin: 20px;">
      <address-input @input="onInput" />
      <div class="address-info" v-if="address">
            <div>
                address : {{ address.formatted_address }}
            </div>
        </div>

        <div v-if="inRisk !== undefined" class="banner-risk" :class="{ 'in-risk': inRisk, 'not-in-risk': !inRisk }">
            {{inRisk ? 'Vous êtes à risque' : "vous n'êtes pas à risque"}}
        </div>
        <div>
            <button @click="submit" class="mdl-button mdl-button--raise"
                :class="{ 'mdl-button--disabled': !address, 'mdl-button--colored': address  }"
            >
                S'inscrire
            </button>
        </div>
    </div>      
  </div>
</template>

<script>
import AddressInput from './address-input.vue';
import Helper from '../../shared/helper';
import axios from 'axios';
import store from '../../shared/store';

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
             this.address = address;
             this.center = {
                 lat: this.address.geometry.location.lat(),
                 lng: this.address.geometry.location.lng()
            };
            const response = await axios.post(
                'http://localhost:8081/in_risk',
                { address: Helper.getPosition(this.address) }
            );
            this.inRisk = response.data.inRisk;
            this.closest = undefined;

            if (!this.inRisk) {
                this.closest = response.data.floodability.point;
                this.closest = { lat: this.closest[1], lng: this.closest[0] };
            }
         },

        async submit() {
            if(!this.address) return;

            store.address = this.address;
            store.inRisk = this.inRisk;
            store.closest = this.closest;
            console.log('passe ici');
            
            this.$router.push(`question/${1}`)
         },
     },
 }
</script>
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
        <template v-if="currentAddress">
            <div v-for="(answer, index) in currentAddress.answers" :key="index">
                {{ answer }}
            </div>
            <button @click="currentAddress = undefined">
                Ignorer
            </button>
        </template>
    </div>
</template>

<script>
 import axios from 'axios';
 export default {
     name: 'admin-page',
     data() {
         return {
             data: [],
             center: { lat: 46.545304, lng: -72.750642 },
             addresses: [],
             currentAddress: undefined,
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/admin');
         this.data = response.data;
         this.addresses = this.data.map((d) => d.address);
     },
     methods: {
         onClick(index) {
             this.currentAddress = this.data[index];
             this.center = { lat: this.currentAddress.address.latitude, lng: this.currentAddress.address.longitude };
         }
     }
 };
</script>

<style>
</style>

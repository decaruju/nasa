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
        poopoo
    </div>
</template>

<script>
 import axios from 'axios';
 export default {
     name: 'admin-page',
     data() {
         return {
             data: [],
             addresses: []
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/admin');
         console.log(response)
         this.data = response.data;
         this.addresses = this.data.map((d) => d.address);
     }
 };
</script>

<style>
</style>

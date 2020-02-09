<template>
    <div class="requests">
        <GmapMap
            :center="center"
            :zoom="16"
            map-type-id="terrain"
        >
            <GmapPolyline
                :path="data"
            />
            <GmapMarker
                v-if="data"
                :position="last"
            />
        </GmapMap>

        <div>
            <h2>Requêtes</h2>
            <div v-for="(request, idx) in requests" :key="idx">
                {{
                    request
                }}
                <button @click="start">
                    Lancer la livraison
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

 export default {
    name: 'map',

    data() {
        return {
            data: [],
            requests: undefined,
        };
    },

    async created() {
        const response = await axios.get('http://localhost:8081/requests');
         this.requests = response.data.payload;
    },

     computed: {
         center() {
             return this.last || { lat: 46.53443, lng: -72.75409 }
         },
         last() {
             return this.data[this.data.length-1];
         },
     },

     sockets: {
         connect(data) {
             console.log('connected', data);
         },
         position(data) {
             this.data.push(data)
             this.$socket.emit('plz')
         },
     },
     methods: {
         start() {
             this.$socket.emit('start')
             this.$socket.emit('plz')
         }
     }
}
</script>

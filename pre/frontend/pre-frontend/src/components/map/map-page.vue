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

        <div style="margin: 20px;">
            <h2>Requêtes</h2>
            <div class="demo-card-image mdl-card mdl-shadow--2dp" v-for="(request, idx) in requests" :key="idx" style="overflow: auto;">
                <div class="mdl-card__title mdl-card--expand">
                    <pre>{{ request }}</pre>
                </div>
                <div class="mdl-card__actions">
                   <button @click="start" class="mdl-button mdl-button--raise mdl-button--colored">
                    Lancer la livraison
                    </button>
                </div>
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
        const payload = response.data.payload;
         this.requests = Object.keys(payload).map((key) => {
             console.log(payload[key], JSON.stringify(payload[key], undefined, 2));
             
             return JSON.stringify(payload[key], null, 2);
         });
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

<template>
    <div class="requests">
        <button @click="start">
            Lancer la livraison
        </button>
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
    </div>
</template>

<script>

 export default {
    name: 'map',

    data() {
        return {
            data: [],
        };
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

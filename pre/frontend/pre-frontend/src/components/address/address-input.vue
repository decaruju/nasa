<template>
    <div class="address-input">
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
            placeholder="Start Typing"
        />
    </div>
</template>

<script>
 import VueGoogleAutocomplete from 'vue-google-autocomplete';

 export default {
     name: 'address-input',
    components: { VueGoogleAutocomplete },
     data() {
         return {
             address: undefined,
         };
     },

     methods: {
         placeChanged(address) {
             console.log('placeChanged');
             this.$emit('input', address);
         },
     },
 };
</script>

<style lang="scss">
 .address-input {

 }

 #map {
     width: 100%;
     margin: 0 auto;
 }

</style>

<template>
    <gmap-autocomplete
        @place_changed="placeChanged"
        placeholder=""
        required
    />
</template>

<script>
 export default {
     name: 'address-input',
     data() {
         return {
             address: undefined,
         };
     },

     methods: {
         placeChanged(address) {
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

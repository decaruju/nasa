<template>
    <gmap-autocomplete
        @place_changed="placeChanged"
<<<<<<< HEAD
        placeholder=""
=======
>>>>>>> 60a871f8b35555c8187a52600976c75b60334c27
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

<template>
    <div class="address-input">
        <gmap-autocomplete
            @place_changed="placeChanged"
            placeholder=""
        >
        </gmap-autocomplete>
    </div>
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

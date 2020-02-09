<template>
    <div class="textfield">
     <div class="placeholder">
            Entrez votre addresse.
        </div>
        <gmap-autocomplete
            class="input"
            @place_changed="placeChanged"
            placeholder=""
            required
        />
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

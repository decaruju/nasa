<template>
    <div class="input-container">
        <div class="input-with-placeholder">
             <gmap-autocomplete
                @place_changed="placeChanged"
                placeholder=""
                required
            />
            <div class="placeholder">
                Entrez votre addresse.
            </div>
        </div>
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

<template>
    <div class="address-input">
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
        />
    </div>
</template>

<script>
 import VueGoogleAutocomplete from 'vue-google-autocomplete';

 export default {
     name: 'address-input',
    components: { VueGoogleAutocomplete },
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
 .button-container {
     width: 100%;
     padding: 20%;
     box-sizing: border-box;

     button {
         width: 100%;
         border: none;
         padding: 10%;
         font-size: 24px;
         text-transform: uppercase;
         border-radius: 20px;

         &:hover {
             background-color: aliceblue;
         }

         &:active {
             background-color: wheat;
         }
     }
 }

</style>

<template>
    <div class="address-input">
        Entrez votre addresse.
        <gmap-autocomplete
          classname="form-control"
          @place_changed="placeChanged">
        </gmap-autocomplete>
        <div class="address-info" v-if="address">
            <div>
                {{ address.formatted_address }}
            </div>
        </div>
        <div v-if="address" class="button-container">
            <button @click="submit">
                Confirmer
            </button>
        </div>
    </div>
</template>

<script>
 import axios from 'axios';

 export default {
     name: 'address-input',
     data() {
         return {
             address: undefined,
         };
     },
     methods: {
         placeChanged(address) {
             this.address = address;
         },

         async submit() {
             const response = await axios.post(
                'http://localhost:8081/address', 
                { address: this.getPosition(this.address) }
            );
            this.$router.push(`question/${response.data.id}`)
         },

         getPosition(address) {
            return {
                lng: address.geometry.location.lng(),
                lat: address.geometry.location.lat(),
            };
        },
     },
 };
</script>

<style lang="scss">
 .address-input {
     height: 100px;
     margin-top: 10%;
     padding: 20%;
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

<template>
    <div class="address-input">
        Entrez votre addresse.
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
        />
        <div class="address-info" v-if="address">
            <div>
                Ville : {{ address.locality }}
            </div>
            <div>
                Province: {{ address.administrative_area_level_1 }}
            </div>
            <div>
                Addresse: {{ address.street_number }} {{ address.route }}
            </div>
            <div>
                Code postal: {{ address.postal_code }}
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
 import VueGoogleAutocomplete from 'vue-google-autocomplete';
 import axios from 'axios';

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
             this.address = address;
         },
         async submit() {
             const response = await axios.post('http://localhost:8081/address', { address: this.address });
             this.$router.push(`question/${response.data.id}`)
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

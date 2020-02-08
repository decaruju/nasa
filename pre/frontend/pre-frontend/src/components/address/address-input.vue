<template>
    <div class="address-input">
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
            placeholder=""
            required
        />

        <div class="input-container">
        <gmap-autocomplete
          classname="form-control"
          @place_changed="placeChanged"/>
        <div class="placeholder">
            Entrez votre adresse
        </div>
        </div>
        <div class="address-info" v-if="address">
            <h1>
                Vos informations :
            </h1>

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
             const response = await axios.post('http://localhost:8081/address', { address: this.address });
             this.$router.push(`question/${response.data.id}`)
         },
     },
 };
</script>

<style lang="scss">
 .address-input {
     height: 100px;
     padding: 10% 20%;
 }
 #map {
     width: 100%;
     margin: 0 auto;
 }

</style>

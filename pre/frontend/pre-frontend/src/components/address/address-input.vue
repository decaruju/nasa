<template>
    <div class="address-input">
        <div class="input-container">
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            @placechanged="placeChanged"
            country="ca"
            placeholder=""
            required
        />
        <div class="placeholder">
            Entrez votre adresse
        </div>
        </div>

        <div class="address-info" v-if="address">
            <h1>
                Vos informations :
            </h1>

            <div>
                <span class="field-name">
                    Ville :
                </span>
                {{ address.locality }}
            </div>
            <div>
                <span class="field-name">
                    Province:
                </span>
                {{ address.administrative_area_level_1 }}
            </div>
            <div>
                <span class="field-name">
                Addresse:
                </span>
                {{ address.street_number }} {{ address.route }}
            </div>
            <div>
                <span class="field-name">
                Code postal:
                </span>
                {{ address.postal_code }}
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
     padding: 10% 20%;
 }
 #map {
     width: 100%;
     margin: 0 auto;
 }

</style>

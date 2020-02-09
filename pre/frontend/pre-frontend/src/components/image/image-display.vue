<template>
    <div class="image">
        <div>
            Veuillez imprimer ce code QR
        </div>

        <qr-code :value="value" :options="{ scale: 20 }" error-correction-level="high" :scale="20" />
    </div>
</template>

<script>
 import QrCode from 'vue-qrcode';

 export default {
     name: 'image-display',
     components: {
         QrCode,
     },
     data() {
         return {
            value: '1',
         };
     },
 };
</script>

<style lang="scss">
 .image {
    margin: 20px;
    text-align: center;

     img {
        height: 50%;
     }
 }
</style>

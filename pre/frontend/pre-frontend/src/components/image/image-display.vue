<template>
    <div class="image">
        Merci pour votre input.
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
     img {
         width: 100%;
     }
 }
</style>

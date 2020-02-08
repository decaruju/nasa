<template>
    <div>
        poopoo
    </div>
</template>

<script>
 import axios from 'axios';
 export default {
     name: 'admin-page',
     data() {
         return {
             data: [],
         };
     },
     async created() {
         const response = await axios.get('http://localhost:8081/admin');
         this.data = response.body;
     }
 };
</script>

<style>
</style>

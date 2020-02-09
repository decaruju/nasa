import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import AddressForm from './components/address/address-form.vue';
import QuestionFormPage from './components/question/question-form-page.vue';
import axios from 'axios';
import ImageDisplay from './components/image/image-display.vue';
import AdminPage from './components/admin/admin-page.vue';
import Request from './components/request/request.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSocketIO from 'vue-socket.io';
import MapPage from './components/map/map-page';

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCYP30P5Tyqcgaz2AXQfZ2hQFXiwKnMjAY',
        libraries: 'places,drawing,visualization',
    },
    installComponents: true,
});

const routes = [
  { path: '/', component: AddressForm },
    { path: '/question/:id', component: QuestionFormPage },
    { path: '/image/:id', component: ImageDisplay },
    { path: '/request', component: Request },
    { path: '/admin', component: AdminPage },
    { path: '/map', component: MapPage },
];

Vue.use(new VueSocketIO({
    connection: 'ws://localhost:5000',
}));

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import AddressForm from './components/address/address-form.vue';
import QuestionForm from './components/question/question-form.vue';
import ImageDisplay from './components/image/image-display.vue';
import AdminPage from './components/admin/admin-page.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

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
    { path: '/question/:id', component: QuestionForm },
    { path: '/image/:id', component: ImageDisplay },
    { path: '/admin', component: AdminPage },
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

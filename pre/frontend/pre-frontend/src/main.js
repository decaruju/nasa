import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import AddressForm from './components/address/address-form.vue';
import QuestionForm from './components/question/question-form.vue';
import ImageDisplay from './components/image/image-display.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: AddressForm },
    { path: '/question/:id', component: QuestionForm },
    { path: '/image/:id', component: ImageDisplay },
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

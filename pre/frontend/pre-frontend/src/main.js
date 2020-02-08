import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import AddressForm from './components/address/address-form.vue';
import QuestionForm from './components/question/question-form.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter)

const routes = [
  { path: '/', component: AddressForm },
    { path: '/question/:id', component: QuestionForm },
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

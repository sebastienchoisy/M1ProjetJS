import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import VueJWT from 'vuejs-jwt';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import restaurantsList from "@/components/restaurantsList";
import restaurantDetails from "@/components/restaurantDetails";
import compte from "@/components/compte";
import register from "@/components/register";
import orders from "@/components/orders";





Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueJWT);
Vue.use(VueGoogleMaps, {
  load: {
    //key: 'AIzaSyCz9DqNjZr_2P3G0YBBFIN6rIUOAr7SrhE'
  }
});


const routes = [
  {path: '*', redirect: '/restaurants'},
  {path: '/restaurants',component: restaurantsList},
  {path: '/restaurant/:id',component: restaurantDetails},
  {path: '/compte',component: compte},
  {path: '/register',component: register},
  {path: '/orders',component: orders}
];
const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

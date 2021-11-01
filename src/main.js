import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import restaurantsService from './services/restaurantsService';
import googleMapsService from "./services/googleMapsService";
import restaurantsList from "@/components/restaurantsList";
import restaurantDetails from "@/components/restaurantDetails";
import compte from "@/components/compte";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    //key: 'AIzaSyCz9DqNjZr_2P3G0YBBFIN6rIUOAr7SrhE'
  }
});


export const restRestaurantsService = new restaurantsService();
export const restGoogleMapsService = new googleMapsService();

const routes = [
  {path: '*', redirect: '/restaurants'},
  {path: '/restaurants',component: restaurantsList},
  {path: '/restaurant/:id',component: restaurantDetails},
  {path: '/compte',component: compte}
];
const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

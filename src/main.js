import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import restaurantsService from './services/restaurantsService'

Vue.config.productionTip = false
Vue.use(ElementUI)
export const restRestaurantsService = new restaurantsService();
new Vue({
  render: h => h(App),
}).$mount('#app')

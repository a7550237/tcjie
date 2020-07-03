import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import axios from 'axios';
import store from './store/store';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

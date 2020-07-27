import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vant from 'vant';
import axios from 'axios';
import store from './store/store';
import Share from 'vue-social-share';
import 'vant/lib/index.css';
import 'vue-social-share/dist/client.css';
import 'vue-search-bar/dist/vue-search-bar.min.css';
import {SearchBar} from 'vue-search-bar';
Vue.use(SearchBar);
Vue.use(Share);
Vue.use(Vant);
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

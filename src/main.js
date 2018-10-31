import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { AUTH_LOGOUT_ACTION } from './store/auth/types';

/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';

Vue.config.productionTip = false;

Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(AUTH_LOGOUT_ACTION);
    }
    throw error;
  },
);

Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  },
});

Vue.use(BootstrapVue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

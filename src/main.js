import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import App from './App.vue'

import routes from './routes';
import i18n from './i18n';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueI18n);

const router = new VueRouter({mode: 'history', routes});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');

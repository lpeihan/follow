import Vue from 'vue';

import '@/assets/styles/index.styl';
import App from '@/app';
import router from '@/router';
import store from '@/store';
// import '@/utils/flexible';
import Icon from '@/components/icon';
import VueLazyload from 'vue-lazyload';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/imgs/default.png'),
  attempt: 1
});

Vue.use(Icon);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

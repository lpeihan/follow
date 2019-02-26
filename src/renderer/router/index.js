import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommends',
      component: require('@/pages/recommends/recommends').default,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: require('@/pages/ranking/ranking').default,
    },
    {
      path: '/search',
      name: 'search',
      component: require('@/pages/search/search').default,
    },
    {
      path: '/my',
      name: 'my',
      component: require('@/pages/my/my').default,
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/pages/about/about').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

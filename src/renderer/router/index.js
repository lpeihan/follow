import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommends',
    },
    {
      path: '/recommends',
      name: 'recommends',
      component: require('@/pages/recommends/recommends').default
    },
    {
      path: '/recommends/:id',
      name: 'recommendsDetails',
      component: require('@/pages/playlist/playlist').default
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: require('@/pages/ranking/ranking').default
    },
    {
      path: '/ranking/:id',
      name: 'rankingDetails',
      component: require('@/pages/playlist/playlist').default
    },
    {
      path: '/search',
      name: 'search',
      component: require('@/pages/search/search').default
    },
    {
      path: '/my',
      name: 'my',
      component: require('@/pages/my/my').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/pages/about/about').default
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: require('@/pages/playlist/playlist').default
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

import Vue from 'vue';
import VueRouter from 'vue-router';

// 3rd party imports
import Auth from '@okta/okta-vue';

import Hello from '../components/Hello.vue';
import DeviceRecords from '../components/DeviceRecords.vue';

// import Home from '../views/Home.vue';

Vue.use(Auth, {
  issuer: 'https://dev-828571.okta.com',
  client_id: '0oa2l69vyO9btrwV24x6',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email',
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello,
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback(),
  },
  {
    path: '/device-records',
    name: 'DeviceRecords',
    component: DeviceRecords,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;

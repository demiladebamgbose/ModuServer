import Auth from './../components/auth.js';
import Home from './../components/home.js';

const routes = [
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/',
    component: Home,
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;

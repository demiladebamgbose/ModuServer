import Auth from './../components/auth.js';
import Home from './../components/home.js';

const authenticationGuard = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next('auth');
    return;
  }
  next();
};

const routes = [
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/',
    component: Home,
    beforeEnter: authenticationGuard,
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;

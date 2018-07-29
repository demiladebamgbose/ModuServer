import Auth from './../components/auth.js';
import Home from './../components/home.js';

import { checkRole } from './../services/auth.js';

const authenticationGuard = (to, from, next) => {
  if (!localStorage.getItem('token')) {
    next('auth');
    return;
  }
  next();
};

const authorizationGuard = (to, from, next) => {
  const { userId } = localStorage;
  Promise.all([checkRole(userId, 'super'), checkRole(userId, 'super')])
  .then((result) => {
    if (result.every(r => r.data)) {
     next()
    } else {
      next('auth');
    }
  }).catch(err => next('auth'));
};

const routes = [
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/',
    component: Home,
    beforeEnter: VueRouterMultiguard([authenticationGuard, authorizationGuard]),
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;

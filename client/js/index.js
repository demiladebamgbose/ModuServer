import App from './components/app.js';
import router from './router/index.js';

var app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
});

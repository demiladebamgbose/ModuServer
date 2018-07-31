import SideBar from './sidebar.js';
import { logOut } from './../services/auth.js';
import router from './../router/index.js';

export default {
  name: 'Home',
  components: {
    SideBar,
  },
  methods: {
    logout() {
      logOut(localStorage.token)
      .then(() => {
        localStorage.clear();
        router.replace('/auth');
      });
    },
  },
  template: `
  <div class="row" home-component>
    <SideBar/>
    <div class="col-md-9 col-md-offset-3">
      <div class="header">
        <div class="action">
          <div>
            <img src="images/cog.svg">
          </div>
          <div @click="logout()">
            <img src="images/logout.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
};

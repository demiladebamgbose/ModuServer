import SideBar from './sidebar.js';

export default {
  name: 'Home',
  components: {
    SideBar,
  },
  template: `
  <div class="row">
    <SideBar/>
    <div class="col-md-9 col-md-offset-3">Yeah</div>
  </div>
  `,
};

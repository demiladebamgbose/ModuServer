export default {
  name: 'SideBar',
  data() {
    return {
      menuItems: [
        {
          label: 'HOME',
          icon: 'images/home.svg',
          roles: [],
          children: [],
          active: true,
        },
        {
          label: 'USERS',
          icon: 'images/user.svg',
          roles: [],
          children: [],
          active: false,
        },
        {
          label: 'POIs',
          icon: 'images/poi.svg',
          roles: [],
          children: [],
          active: false,
        },
      ]
    };
  },
  template: `
  <div class="sidebar col-md-3" side-bar-component>
    <div class="row">
      <div class="col-md-3 main-nav">
        <div class="logo">
          <img src="../../images/Modu Logo.png"  width="35.83px" height="43px"/>
        </div>
        <div class="menu-items">
          <div class="menu-item" v-for="item in menuItems">
            <a @click.prevent="">
              <div class="icon">
              <object type="image/svg+xml" :data="item.icon" class="menu-item-icon">
              </object>
              </div>
              <p>{{item.label}}</p>
            </a>
          </div>
        </div>
      </div>

      <div class="col-md-9 sub-nav">
        <div class="subtop">
        </div>
      </div>
    </div>
  </div>
  `,
};

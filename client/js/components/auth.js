import { checkRole } from './../services/auth.js';

export default {
  name: 'Auth',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errorMessage: ''
    };
  },
  methods: {
    validateAndLogin() {
      this.errorMessage = '';
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.isLoading = true;
          this.attemptLogin(this.user)
            .then((res) => {
              console.log(res.data)
              const token = res.data.id;
              const { user, userId } = res.data;

              Promise.all([checkRole(userId, 'super'), checkRole(userId, 'super')])
              .then((result) => {
                console.log(result)
                if (result.every(r => r.data)) {
                  localStorage.setItem('token', token);
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('userId', userId);
                  this.$router.push('/')
                }
              });
            })
            .catch((err) => {
              this.errorMessage = 'Authentication failed, please try again';
            });
        }
      });
    },
    attemptLogin() {
      return axios.post('/api/people/login?include=user', this.user);
    }
  },
  template: `
  <div>
    <div class="container" auth-component>
      <form @submit.prevent="validateAndLogin()">
        <div class="form-group">
        <p class="error-message summary" v-if="errorMessage !== ''">{{errorMessage}}</p>
          <label class="form-label" for="email">email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@doe.com" 
            v-validate="'required|email'"
            :class="{'input-error': errors.has('email')}" 
            v-model="user.email">
            <span class="error-message" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Enter your password" 
            v-validate="'required'" 
            :class="{'input-error': errors.has('password')}" 
            v-model="user.password">
            <span class="error-message" v-if="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="button-container text-center-align">
          <button type="submit">
            sign in
          </button>
        </div>
      </form>
    </div>
  </div>`,
};

export default {
  name: 'app',
  data() {
    return {
      user: null,
    };
  },
  async created() {
    await this.refreshUser();
  },
  watch: {
    $route: 'onRouteChange',
  },
  methods: {
    login() {
      this.$auth.loginRedirect();
    },
    async onRouteChange() {
      // every time a route is changed refresh the user details
      await this.refreshUser();
    },
    async refreshUser() {
      // get new user details and store it to user object
      this.user = await this.$auth.getUser();
    },
    async logout() {
      await this.$auth.logout();
      await this.refreshUser();
      this.$router.push('/');
    },
  },
};

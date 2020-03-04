<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" type="light" variant="light">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">Device Tracker</b-navbar-brand>
        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav>
            <b-nav-item href="#" @click.prevent="login" v-if="!user">Login</b-nav-item>
            <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
            <b-nav-item to="/device-records">Device Records</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
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

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

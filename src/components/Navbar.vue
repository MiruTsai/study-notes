<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>
      <router-link to="/" exact>Study Notes</router-link>
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :disabled="!ifLogged">
        <router-link to="/add" exact>發文</router-link>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="mr-auto">
      <b-nav-item-dropdown :disabled="!ifLogged" text="分類" left>
        <b-dropdown-item
          v-for="cat in catlog"
          :key="Math.random()*10000"
          v-on:click="changeCatlog(cat.text)"
        >{{cat.text}}</b-dropdown-item>
        <b-dropdown-item v-on:click="changeCatlog('all')">all</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto userDropDown">
      <b-nav-item-dropdown right>
        <template v-slot:button-content>User</template>
        <b-dropdown-item v-show="ifLogged" v-on:click="signOut">Sign Out</b-dropdown-item>
        <b-dropdown-item v-show="!ifLogged">
          <router-link to="/login" exact>Sign In</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import { BBreadcrumb, BNavbar } from "bootstrap-vue";
export default {
  components: {
    "b-breadcrumb": BBreadcrumb,
    "b-navbar": BNavbar
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("您已成功登出");
        });
    },
    changeCatlog(value) {
      this.$emit('changeCatlog',value);
    }
  },
  computed:{
    ifLogged(){
      return this.$store.state.user.login
    },
    catlog(){
      return this.$store.state.user.catlog
    }
  }
};
</script>
<style scoped>
.navbar-brand a {
  color: #fff;
}
.navbar-brand a:hover {
  text-decoration: none;
}
.nav-link a {
  color: rgba(255, 255, 255, 0.5);
}
.nav-link a:hover {
  color: rgba(255, 255, 255, 1);
}
@media (max-width: 480px) {
  h5 {
    margin: 0;
  }
  .nav-item {
    margin: auto 10px;
  }
  .article {
    margin: 0;
    padding: 0;
  }
  .navbar-brand {
    margin-right: 0;
  }
  .userDropDown {
    position: absolute;
    z-index: 10;
    right: 5px;
  }
}
</style>
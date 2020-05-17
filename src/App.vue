<template>
  <div>
    <appNav v-on:changeCatlog="updateCatlog($event)"></appNav>
    <div class="container">
      <router-view v-bind:catlog="catlog"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import firebase from "firebase";
export default {
  components: {
    appNav: Navbar
  },
  data() {
    return {
      catlog: "all"
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.dispatch("login", user);
    } else {
      return;
    }
  },
  methods: {
    updateCatlog(value) {
      this.catlog = value;
    }
  }
};
</script>
<style>
* {
  font-family: "Noto Sans TC", "微軟正黑體", "新細明體", arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  text-decoration: none;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: none;
}
</style>
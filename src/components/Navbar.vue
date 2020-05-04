<template>
  <b-breadcrumb>
    <b-breadcrumb-item v-for="item in items">{{item.text}}</b-breadcrumb-item>
  </b-breadcrumb>
</template>
<script>
import { BNavbar } from 'bootstrap-vue'
import { BBreadcrumb } from "bootstrap-vue";
export default {
  components: {
    "b-breadcrumb": BBreadcrumb,
    'b-navbar': BNavbar
  },
  data() {
    return {
      items: [
        { text: "前端", href: "#" },
        { text: "後端", href: "#" },
        {
          text: "UI/UX",
          active: true
        }
      ]
    };
  }
};
</script>
<style scoped>
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 0 10px;
}
</style>
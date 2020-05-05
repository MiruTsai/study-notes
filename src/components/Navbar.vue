<template>
  <b-breadcrumb>
    <b-breadcrumb-item v-for="item in items" v-on:click="changeCatlog(item.href)">{{item.text}}</b-breadcrumb-item>
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
      // items: [
      //   { text: "前端", href: "#" },
      //   { text: "後端", href: "#" },
      //   {
      //     text: "UI/UX",
      //     active: true
      //   }
      // ]
items: [
        { text: "文章", href: "show-articles" },
        { text: "發文", href: "addBlog" }
        
      ]

    };
  },
  methods:{
    changeCatlog(catlog){
      this.$emit('changeCatlog',catlog)
    }
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
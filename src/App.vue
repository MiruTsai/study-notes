<template>
  <div>   
    <h1>{{title}}</h1>
    <div class="header">
     <appNav v-on:changeCatlog="updatePage($event)"></appNav>      
    </div>
    <div class="container">
      <component v-bind:is="page"></component>
    </div>
    <appFooter></appFooter>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShowArticles from './components/ShowArticles'
import AddBlog from './components/AddBlog'
export default {
  components:{
    'appNav':Navbar,
    'appFooter':Footer,
    'show-articles':ShowArticles,
    'addBlog':AddBlog    
  },
  data() {
    return {
      title: "My study notes",
      page:"show-articles"
    }
  },
  methods:{
    updatePage:function(currentPage){
      this.page = currentPage
    }
  }
}
</script>
<style>
*{
  box-sizing: border-box;
  margin:0;  
}
.header{
    display: flex;
    justify-content: space-between;
}

</style>
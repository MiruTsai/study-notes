<template>
  <div>   
    <h1>{{title}}</h1>
    <div class="header">
     <appNav></appNav>
      <div>發文</div>
    </div>
    <div class="container">
      <component is="show-articles"></component>      
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
      title: "My study notes"      
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
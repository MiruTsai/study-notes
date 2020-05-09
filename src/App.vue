<template>
  <div>
    <appNav v-bind:catlog='user.catlog' v-bind:ifLogged='ifLogged'></appNav>
    <div class='container'>
      <router-view v-bind:catlog='user.catlog' v-on:login='updateLoginStatus($event)' v-bind:user='user'></router-view>
    </div>
   
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import firebase from 'firebase';
export default {
  components: {
    appNav: Navbar    
  },
  data() {
    return {
      user: {},      
      ifLogged:false
    };
  },
  methods: {
    updateLoginStatus(value){
      this.ifLogged = true
      this.user = value
    }
  },  
};
</script>
<style>
* {
  font-family:'Noto Sans TC', '微軟正黑體', '新細明體', arial, sans-serif;    
  box-sizing: border-box;
  margin: 0;
  text-decoration: none;
}
a{
  text-decoration: none;
  color:black;
}
a:hover{
  text-decoration: none;
}
</style>
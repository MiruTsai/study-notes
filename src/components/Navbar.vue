<template>
  <div>    
    <b-navbar toggleable='lg' type='dark' variant='info'>
     
      <b-navbar-brand><router-link to='/' exact>My Study Notes</router-link></b-navbar-brand>
      <!-- <b-collapse id='nav-collapse' is-nav> -->
        <b-navbar-nav>
            <b-nav-item :disabled='!ifLogged'><router-link to='/add' exact>發文</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class='mr-auto'>
          <b-nav-item-dropdown :disabled='!ifLogged' text='分類' left>
            <b-dropdown-item v-for='cat in catlog' :key='Math.random()*10000'>{{cat.text}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
       
        <b-navbar-nav class='ml-auto'>          
          <b-nav-item-dropdown right>            
            <template v-slot:button-content>
              User
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item v-show='ifLogged'>Sign Out</b-dropdown-item>
            <b-dropdown-item v-show='!ifLogged'><router-link to='/login' exact>Sign In</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>      
    </b-navbar>
   
      </div>
</template>
<script>
import { BBreadcrumb, BNavbar } from 'bootstrap-vue';
export default {
  props: ['catlog','ifLogged'],
  components: {
    'b-breadcrumb': BBreadcrumb,
    'b-navbar': BNavbar
  },
  data() {
   return{
    
   }
  },
  methods:{
   
  }
};
</script>
<style scoped>
.navbar-brand a{
color:#fff;
}
.nav-link a{  
  color:rgba(255,255,255,0.5)
}
.nav-link a:hover{
  color:rgba(255,255,255,1)
}
@media(max-width:480px){
h5{
  margin:0;
}
.nav-item{
  margin: auto 10px;
}
.article{
  margin:0;
  padding:0;
}
}

</style>
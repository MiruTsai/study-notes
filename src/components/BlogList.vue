<template>
  <div class='article'>
    <h5>文章列表</h5>
    <template v-for='article in articles'>
    <router-link v-bind:to="'/blog/'+ article.id"> 
    <h3 v-on:click='article.show=!article.show'>
        {{article.title}}
        <span>
          <b-badge variant='info'>{{article.cat}}</b-badge>
        </span>
      </h3>    
      </router-link>
        <span>Author: {{article.author}}</span>
      <div v-show='article.show'>
        <a v-bind:href='article.link' target='_blank'>{{article.link}}</a>
        <p>{{article.content}}</p>
      </div>
      <hr />
    </template>
  </div>
</template>

<script>
import firebase from 'firebase';
import { BBadge } from 'bootstrap-vue';

export default {
  
  components: {
    'b-badge': BBadge
  },
  data(){
    return{
      articles:[],
    }
  },
  created(){
    firebase.firestore().collection('articles').get().then(article => {      
        article.forEach(doc => {
          let x = doc.data();
          x.id = doc.id;
          x.show = false;          
          this.articles.push(x);
        });
      });
  }
};

</script>
<style>


h5 {
  margin: 20px 0 50px;
}
.article {
  margin: 10px 0;
  padding: 20px;
}
.article span {
  font-size: 16px;
  padding: 3px;
}
hr {
  color: #ccc;
  margin: 20px 0;
}
</style>
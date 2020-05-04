<template>
  <div class="article">
    <h3>文章列表</h3>
    <template v-for="article in articles">
      <h2 v-on:click="article.show=!article.show">{{article.title}}</h2>
      <span>{{Date(article.postTime)}}</span>
      <div v-show="article.show">
        <a v-bind:href="article.link" target="_blank">{{article.link}}</a>
        <p>{{article.content}}</p>
      </div>
      <hr />
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      articles: [],      
    };
  },
  
  methods: {
    
  },
  created() {
    firebase.firestore().collection("articles").get().then(article => {      
        article.forEach(doc => {
          let x = doc.data();
          x.id = doc.id;
          x.show = false;          
          this.articles.push(x);
        });
      });
      this.articles = documents      
  }
};
</script>
<style scoped>
.article {
  margin: 10px 0;
  padding: 20px;
}
hr {
  color: #ccc;
  margin: 20px 0;
}
</style>
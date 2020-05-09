<template>
  <div class="article">
    <template  v-for="article in articles">
      <b-card :header="article.cat">        
      <a :href="article.link">
      <link-prevue :url="article.link" :key="Math.random()*500000" cardWidth="337px" :showButton=false></link-prevue>
      </a>
      <b-card-text>owner: {{article.author}}</b-card-text>
      </b-card>
    </template>
  </div>
</template>
<script>
import firebase from 'firebase';
import { BBadge, BCard } from 'bootstrap-vue';
import LinkPrevue from 'link-prevue'
export default {
  components: {
    "b-badge": BBadge,
    "b-card": BCard,
    LinkPrevue
  },
  data() {
    return {
      articles: []      
    };
  },
  methods:{
    onClick(prevue) {
      window.open(prevue.url , '_blank')
    }
  },
  created() {
    firebase
      .firestore()
      .collection("articles")
      .get()
      .then(article => {
        article.forEach(doc => {
          let x = doc.data();
          x.id = doc.id;          
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

.article{
  column-count: 3;
  
}
.card{
  margin: 10px;
  align-items: center;
}
.card-header{
  width:100%
}
.card-body{
  padding:0;
}
.wrapper{
break-inside: avoid;
  
}
.badge-info {
  font-size: 16px;
  padding: 3px;
}
.author {
  font-size: 14px;
}
.wraper{
  width: 100px;
}
.article .card-text{
  margin:3px;
  text-align: right;
  font-size: 12px;
}
@media (max-width: 480px) {
  h5 {
    margin: 10px 0 20px;    
  }
  .article {
    margin: 0;
    padding: 0;
    column-count: 1;
  }
  .author {
    font-size: 10px;
  }

}
</style>
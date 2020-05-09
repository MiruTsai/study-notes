<template>
  <div id="blog">
    <h1>{{blog.title}}</h1>
    <div class="content">
      <a :href="blog.link" target="_blank">
        <link-prevue :url="blog.link" :showButton="false"></link-prevue>
      </a>
    </div>    
    <article>{{blog.content}}</article>
  </div>
</template>
<script>
import LinkPrevue from "link-prevue";
import firebase from "firebase";
export default {
  components: {
    LinkPrevue
  },
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    firebase
      .firestore()
      .collection("articles")
      .doc(this.id)
      .get()
      .then(doc => {
        this.blog = doc.data();
      });
  }
};
</script>
<style scoped>
#blog {
  text-align: center;
}
#blog h1 {
  margin: 20px auto;
}
#blog .content {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
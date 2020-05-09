<template>
  <div id='blog'>
    <h1>{{blog.title}}</h1>
    <a v-bind:href="blog.link">文章連結</a>
    <article>心得：{{blog.content}}</article>
  </div>
</template>
<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    firebase
      .firestore()
      .collection('articles')
      .doc(this.id)
      .get()
      .then(doc => {
        this.blog = doc.data();
      });
  }
};
</script>
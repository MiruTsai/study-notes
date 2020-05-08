<template>
  <div id='blog'>
    <h1>{{blog.title}}</h1>
    <a>{{blog.link}}</a>
    <article>{{blog.content}}</article>
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
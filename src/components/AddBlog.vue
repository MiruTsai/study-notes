<template>
  <div id="addBlog">
    <b-form @submit="onSubmit" @reset="onReset" v-show="!submitted">
      <b-form-group id="input-group-1" label="標題" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model.lazy="blog.title"
          type="text"
          required
          placeholder="請輸入標題"
        ></b-form-input>
      </b-form-group>
      <b-form-select v-model="blog.cat" :options="userCatlog"></b-form-select>
      <b-form-group id="input-group-2" label="連結:" label-for="input-2">
        <b-form-input id="input-2" v-model="blog.link" required placeholder="來源"></b-form-input>
      </b-form-group>
      <b-form-group id="textarea-group-3" label="內文:" label-for="textarea-group-3">
        <b-form-textarea id="textarea-group-3" v-model="blog.content" rows="3" max-rows="6"></b-form-textarea>
      </b-form-group>
      <b-button v-on:click="onSubmit" variant="primary">送出</b-button>
    </b-form>
    <p v-show="submitted">文章已成功送出</p>
    <div id="preview">
      <h3>預覽</h3>
      <link-prevue
        v-model="blog.preview"
        :url="blog.link"
        cardWidth="337px"
        :onButtonClick="onClick"
      ></link-prevue>
      <p v-show="!blog.link">標題 : {{blog.title}}</p>
      <p>筆記 : {{blog.content}}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { BForm, BButton } from "bootstrap-vue";
import LinkPrevue from "link-prevue";
export default {
  components: {
    "b-form": BForm,
    "b-button": BButton,
    LinkPrevue
  },
  data() {
    return {
      blog: {
        title: "",
        link: "",
        content: "",
        author: this.$store.state.user.name,
        authorID: this.$store.state.user.userID,
        cat: "",
        postTime: new Date().toLocaleDateString("zh-Hans-TW")
      },
      submitted: false
    };
  },
  methods: {
    onSubmit(evt) {
      let catlogIndex = this.findCatlogValue(this.blog.cat);
      this.blog.cat = this.userCatlog[catlogIndex].text;
      evt.preventDefault();
      firebase
        .firestore()
        .collection("articles")
        .doc()
        .set(this.blog)
        .then(() => {
          this.submitted = true;
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.blog.title = "";
      this.blog.link = "";
      this.blog.content = "";
    },
    findCatlogValue(value) {
      return this.userCatlog.findIndex(item => item.value === value);
    }
  },
  computed: {
    userCatlog() {
      return this.$store.state.user.catlog;
    }
  }
};
</script>
<style scoped>
#addBlog * {
  box-sizing: border-box;
}
#addBlog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
p {
  margin: 20px 0 10px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
#preview .wrapper {
  margin: 10px auto;
}
h3 {
  margin: 10px 0;
}
</style>
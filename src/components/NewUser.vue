<template>
  <div>
    <h5>歡迎加入，請自訂您的分類！</h5>
    <b-input-group>
      <b-form-input v-model="catlogName"></b-form-input>
      <b-button variant="info" v-on:click="addNewCatlog">新增</b-button>
    </b-input-group>
    <b-list-group>
      <b-list-group-item v-for="catlog in catlogList" :key="Math.random()*10000">{{catlog.text}}</b-list-group-item>
      <b-button variant="secondary" v-on:click="addNewCatlogToFirebase">送出</b-button>
    </b-list-group>
  </div>
</template>
<script>
import { BListGroup, BButton } from "bootstrap-vue";
import firebase from "firebase";
export default {
  components: {
    "b-list-group": BListGroup,
    "b-button": BButton
  },
  data() {
    return {
      catlogName: "",
      catlogList: []
    };
  },
  methods: {
    addNewCatlog() {
      this.catlogList.push({
        text: this.catlogName,
        value: "cat" + this.catlogList.length
      });
      this.catlogName = "";
    },
    addNewCatlogToFirebase() {
      let userID = this.$store.state.user.userID;
      firebase
        .firestore()
        .collection("member")
        .doc(userID)
        .update({
          catlog: this.catlogList
        })
        .then(() => {
          this.$store.dispatch("updateCatlogList", this.catlogList);
          this.$router.push("/");
        });
    }
  }
};
</script>
<style scoped>
h5 {
  text-align: center;
  margin: 200px auto 0;
}
.input-group {
  margin: 50px auto 0;
  width: 70%;
}
.list-group {
  margin: 0 auto;
  width: 70%;
}
.list-group button {
  width: 20%;
  margin: 50px auto;
}
@media (max-width: 480px) {
  h5 {
    margin: 20px auto;
    font-size: 16px;
  }
  .input-group {
    margin: 0 auto;
    width: 100%;
  }
  .list-group {
    width: 100%;
  }
  .list-group button {
    width: 30%;
    margin: 30px auto;
  }
}
</style>
<template>
  <div>
    <b-input-group>
      <b-form-input v-model="catlogName"></b-form-input>
      <b-button variant="info" v-on:click="addNewCatlog">新增</b-button>
    </b-input-group>
    <b-list-group>
      <b-list-group-item v-for="catlog in catlogList" :key="Math.random()*10000">{{catlog.text}}</b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { BListGroup, BButton } from "bootstrap-vue";
import firebase from "firebase";
export default {
  components: {
    "b-list-group": BListGroup,
    "b-button":BButton
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
    }
  },
  beforeDestroy() {
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
      });
  }
};
</script>
<style scoped>
.input-group {
  margin: 200px auto 0;
  width: 70%;
}
.list-group {
  margin: 0 auto;
  width: 70%;
}
@media (max-width: 480px) {
  .input-group {
    margin: 0 auto;
    width: 90%;
  }
  .list-group {
    width: 90%;
  }
}
</style>
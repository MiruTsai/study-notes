<template>
  <div class="login">
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="會員登入" active>
          <b-card>
            <b-form @reset="onReset">
              <b-form-group id="input-group-2" label="帳號：" label-for="input-2">
                <b-form-input
                  id="input-1"
                  v-model="user.email"
                  type="email"
                  required
                  placeholder="請填入您的帳號"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="密碼：" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="user.password"
                  type="password"
                  required
                  placeholder="請輸入密碼"
                ></b-form-input>
              </b-form-group>
            </b-form>

            <button v-on:click="signIn" variant="primary">提交</button>
            <button v-on:click="googleLogin" class="social-button">使用 Google 帳戶登入</button>
          </b-card>
          <div id="firebaseui-auth-container"></div>
        </b-tab>
        <b-tab title="會員申請">
          <b-card>
            <b-form @reset="onReset">
              <b-form-group id="name" label="姓名：" label-for="name">
                <b-form-input
                  id="input-1"
                  v-model="user.name"
                  type="text"
                  required
                  placeholder="請填入您的姓名"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="帳號：" label-for="input-2">
                <b-form-input
                  id="input-1"
                  v-model="user.email"
                  type="email"
                  required
                  placeholder="請填入您的帳號"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="密碼：" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="user.password"
                  type="password"
                  required
                  placeholder="請輸入密碼"
                ></b-form-input>
              </b-form-group>
            </b-form>
            <b-button v-on:click="signUp" variant="primary">提交</b-button>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { BTabs, BForm, BButton } from "bootstrap-vue";
import firebase from "firebase";
export default {
  components: {
    "b-tabs": BTabs,
    "b-form": BForm,
    "b-button": BButton
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        userID: ""
      },
      loginPage: true,
      tabIndex: 0
    };
  },
  methods: {
    signIn(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.user));
    },
    signUp(evt) {
      evt.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          let obj = {
            email: this.user.email,
            displayName: this.user.name,
            uid: firebase.auth().currentUser.uid,
            catlog: []
          };
          this.$store.dispatch("login",obj)
          this.createMember(obj);
        })
        .then(()=>{
          this.$router.push("/newuser");
        })
        .catch(function(error) {
          console.log(error.message);
          if(error.message === "Password should be at least 6 characters"){
            alert("密碼須至少六位數")
            return
          }else if(error.message === "The email address is badly formatted."){
            alert("請輸入正確 e-mail")
            return 
          }
        });
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.findMember(firebase.auth().currentUser.uid);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.user.email = "";
      this.user.name = "";
      this.user.password = "";
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let user = result.user;
          this.findMember(user);
        });
    },
    findMember(user) {
      firebase
        .firestore()
        .collection("member")
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            let info = doc.data();
            this.$store.dispatch("login",info);
            this.$router.push("/")
          } else {            
            this.createMember(user);
            this.$router.push("/newuser");
          }          
        });
    },
    createMember(user) {
      firebase.auth().currentUser.sendEmailVerification()
      firebase
        .firestore()
        .collection("member")
        .doc(user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          userID: user.uid,
          catlog: user.catlog
        })
        .then(() => {
          this.$store.dispatch("login",user)
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 50%;
  margin: 230px auto;
}
.social-button {
  background-color: white;
}
button {
  display: block;
  margin: 20px auto;
  width: 50%;
  padding: 5px;
}
@media (max-width: 480px) {
  .login {
    width: 100%;
    margin: 20px auto;
  }
  button {
    width: 100%;
  }
}
</style>
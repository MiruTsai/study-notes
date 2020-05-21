import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        articles: [],
        user: {
            name: "",
            userID: "",
            catlog: [],
            login: false
        }
    },
    mutations: {
        login(state, payload) {
            state.user.name = payload.name || payload.displayName;
            state.user.userID = payload.uid || payload.userID;
            state.user.catlog = payload.catlog;
            state.user.login = true;
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        getArticles(state) {
            firebase
                .firestore()
                .collection("articles")
                .get()
                .then(article => {
                    article.forEach(doc => {
                        let x = doc.data();
                        x.id = doc.id;
                        state.articles.push(x);
                    });
                    state.articles.sort(function (a, b) {
                        a = Date.parse(a.postTime).valueOf();
                        b = Date.parse(b.postTime).valueOf();
                        return b - a;
                    });
                });
        },
        clearArticles(state) {
            state.articles = [];
        },
        updateCatlogList(state, payload) {
            state.user.catlog = payload
        },
        deleteBlog(state, payload) {
            if (confirm("您確定刪除這篇貼文嗎？")) {
                firebase.firestore().collection("articles").doc(payload).delete().then(function () {
                    state.articles = state.articles.filter(article => {
                        return article.id !== payload
                    })
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                return;
            }
        }
    },
    actions: {
        login: ({ commit }, payload) => {
            commit("login", payload)
        },
        getArticles: ({ commit }) => {
            commit("getArticles")
        },
        clearArticles: ({ commit }) => {
            commit("clearArticles")
        },
        updateCatlogList: ({ commit }, payload) => {
            commit("updateCatlogList", payload)
        },
        deleteBlog: ({ commit }, payload) => {
            commit("deleteBlog", payload)
        }
    }
})
<template>
  <div class="article">
    <template v-for="article in filterArticles">
      <b-card>
        <b-card-header>
          <router-link :to="'/blog/'+article.id">{{article.cat}}</router-link>
          <b-icon icon="trash" v-on:click="deleteBlog(article.id)"></b-icon>
        </b-card-header>
        <a :href="article.link">
          <link-prevue
            :url="article.link"
            :key="Math.random()*500000"
            cardWidth="337px"
            :showButton="false"
          ></link-prevue>
        </a>
        <b-card-text class="noLink" v-show="!article.link">{{article.title}}</b-card-text>
        <b-card-text>{{article.postTime}} {{article.author}}</b-card-text>
      </b-card>
    </template>
  </div>
</template>
<script>
import firebase from "firebase";
import { BBadge, BCard } from "bootstrap-vue";
import LinkPrevue from "link-prevue";
export default {
  props: ["catlog"],
  components: {
    "b-badge": BBadge,
    "b-card": BCard,
    LinkPrevue
  },
  computed: {
    onClick(prevue) {
      window.open(prevue.url, "_blank");
    },
    filterArticles() {
      let articles = this.$store.state.articles;
      return articles.filter(article => {
        if (this.catlog === "all") {
          return article;
        } else {
          return article.cat === this.catlog;
        }
      });
    }
  },
  methods: {
    deleteBlog(id) {
      this.$store.dispatch("deleteBlog", id);
    }
  },
  mounted() {
    this.$store.dispatch("getArticles");
  },
  destroyed() {
    this.$store.dispatch("clearArticles");
  }
};
</script>
<style>
a {
  color: black;
}
a:hover {
  text-decoration: none;
}
.article {
  margin: 20px auto;
  column-count: 3;
}
.article .bi-trash {
  opacity: 0;
}
.article .bi-trash:hover {
  transition: all 0.5s ease;
  opacity: 1;
}
.article .card {
  margin: 10px;
  align-items: center;
}
.article .card-header {
  width: 337px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article .card-header .postTime {
  font-size: 12px;
}
.article .card-body {
  padding: 0;
}
.article .wrapper {
  break-inside: avoid;
}
.article .card-text {
  padding: 5px 10px;
  text-align: right;
  font-size: 12px;
}
.article .noLink {
  text-align: left;
  padding: 1.25rem;
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
  .article .card {
    width: 339px;
    margin: 10px 0;
  }
  .article .bi-trash {
    opacity: 1;
  }
}
</style>
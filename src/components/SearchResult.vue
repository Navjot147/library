<template>
  <div>
    <ul class="search-result" v-if="searchType === 1 && searchResult.length">
      <li v-for="result in searchResult" v-bind:key="result.key" class="result">
        <router-link :to="{name: 'detail', params: { id: result.key.split('/')[2] }}" class="unit">
          <img :src="'//covers.openlibrary.org/b/id/' + result.cover_i +'-S.jpg'">
          <span>
            <div class="title">{{result.title}}</div>
            <span>by{{' '}}</span>
            <span class="author">{{result.author_name[0]}}</span>
          </span>
        </router-link>
      </li>
    </ul>

    <div v-if="searchType === 2 && searchResult.name" class="isbn-result">
      <div class="unit">
        <img :src="'//covers.openlibrary.org/b/id/' + searchResult.name.cover_i +'-S.jpg'">
        <span>
          <div class="title">
            <span>Preview Url:{{' '}}</span>
            <a :href="searchResult.name.preview_url">{{searchResult.name.preview_url}}</a>
          </div>
          <span>Info Url:{{' '}}</span>
          <span class="author">
            <a :href="searchResult.name.info_url">{{searchResult.name.preview_url}}</a>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    searchType: Number
  },
  computed: mapState({
    searchResult: state => state.books.searchResult,
    searchError: state => state.books.searchError
  })
};
</script>
<style scoped>
.search-result {
  position: relative;
  z-index: 999;
  height: 50vh;
  left: -71px;
  overflow: scroll;
}
.isbn-result {
  width: 20%;
  margin: 0 auto;
  overflow: hidden;
  word-break: break-word;
}
li {
  border-bottom: 1px solid #e2e2e2;
}
.search-result .result {
  text-align: left;
  padding: 7px;
  border-top: 1px solid #dedede;
  font-size: 0.9rem;
}
.title,
.author {
  font-weight: 500;
}
.author {
  color: #036;
}
.search-result li .unit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  text-decoration: none;
  color: #333;
}
.unit img {
  width: 40px;
  min-width: 40px;
  height: 60px;
  min-height: 60px;
  background-color: #ededed;
  margin-right: 10px;
}

ul {
  margin: 0 auto;
  padding: 0;
  width: 20%;
  list-style: none;
  border: 1px solid #e2e2e2;
}
</style>



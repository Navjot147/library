<template>
  <div>
    <div style="display: inline-flex;">
      <div class="search-input">
        <input
          type="text"
          @input="onSearchInputChange"
          @change="onSearchInputChange"
          v-model="searchInput"
          placeholder="Search books"
        >
        <input type="submit" value class="search-bar-submit" aria-label="Search submit">
      </div>

      <span v-for="criteria in criterias" v-bind:key="criteria.id">
        <input
          type="radio"
          :id="criteria.id"
          name="Select Criteris"
          v-bind:value="{id: criteria.id, name: criteria.name}"
          v-model="creteriaSelect"
          @change="onSelectionChange"
          :checked="criteria.id === currentPortalId"
        >
        <label :for="criteria.id">{{criteria.name}}</label>
      </span>
    </div>
    <SearchResult :search-type="creteriaSelect.id"/>
    <div>{{validationError}}</div>
  </div>
</template>
<script>
import { debounce } from "../helpers/utils";
import SearchResult from "./SearchResult.vue";
export default {
  components: {
    SearchResult
  },
  data() {
    return {
      searchInput: "",
      criterias: [{ id: 1, name: "Name" }, { id: 2, name: "ISBN" }],
      creteriaSelect: { id: 1, name: "Name" },
      currentPortalId: 1,
      validationError: ""
    };
  },
  watch: {
    searchInput: function() {
      if (!this.searchInput) {
        this.validationError = "";
        return;
      }
      let str = "";
      if (this.creteriaSelect.id === 1) {
        if (!isNaN(this.searchInput)) {
          str = "Book name cannot be numeric";
        }
      } else if (this.creteriaSelect.id === 2) {
        if (isNaN(this.searchInput)) {
          str = "Book name cannot be Alphabets";
        }
      }
      this.validationError = str;
    }
  },
  methods: {
    onSearchInputChange: function() {
      if (
        !this.searchInput ||
        this.searchInput.length < 3 ||
        this.validationError
      )
        return;
      this.$store.dispatch("books/getSearchResult", {
        query: this.searchInput,
        typeId: this.creteriaSelect.id
      });
    },
    onSelectionChange: function() {
      this.searchInput = "";
      this.validationError = "";
      this.$store.dispatch("books/clearSearchResults");
    }
  },
  created() {
    this.onSearchInputChange = debounce(this.onSearchInputChange, 300);
  }
};
</script>
<style scoped>
.search-input {
  min-width: 50px;
  margin: 0 auto;
  border: 1px solid #e2e2e2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.search-input input[type="text"] {
  min-width: 0;
  margin: 3px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 5px 0 2px 3px;
  font-size: 1em;
  font-weight: 500;
  border: 0 none;
  outline: none;
  /* background: #fafafa; */
  color: #666;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.search-input input[type="submit"] {
  background: url(https://openlibrary.org/static/images/search-lens.png) center
    no-repeat;
  width: 31px;
  height: 30px;
  border: none;
  border: none;
  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
}
</style>



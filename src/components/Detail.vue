<template>
  <div class="details">{{bookData}}</div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    searchResult: state => state.books.searchResult,
    bookData: state => state.books.bookData
  }),
  mounted() {
    if (this.searchResult.length) {
      this.$store.dispatch("books/getBooksData", this.$route.params.id);
    } else {
      this.$router.push("/search");
    }
  }
};
</script>
<style scoped>
</style>




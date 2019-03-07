<template>
  <div class="auth">
    <Google v-if="authtype === 'google'"/>
  </div>
</template>
<script>
import Google from "./Google.vue";
export default {
  props: {
    authtype: {
      type: String
    }
  },
  components: {
    Google
  },
  mounted() {
    const authData = JSON.parse(localStorage.getItem("userInfo"));
    if (authData) {
      this.$store.dispatch("auth/saveAuthData", authData);
      this.$router.push("/search");
    }
  }
};
</script>
<style scoped>
.auth {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  height: 18em;
  margin-top: -9em;
  margin-left: -15em;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
}
</style>




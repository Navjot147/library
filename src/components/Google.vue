<template>
  <div class="google">
    <button class="loginBtn loginBtn--google" @click="onGoogleLoginClick">Sign in with Google</button>
  </div>
</template>
<script>
export default {
  methods: {
    onGoogleLoginClick: async function() {
      try {
        const response = await this.$gAuth.signIn();
        const authData = {
          email: response.w3.U3,
          name: response.w3.ig,
          token: response.Zi.access_token
        };
        this.$store.dispatch("auth/saveAuthData", authData);
        this.$router.push('/search');
      } catch (er) {
        console.log(er);
      }
    }
  }
};
</script>
<style scoped>
.loginBtn {
  box-sizing: border-box;
  position: relative;
  margin: 7.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Google */
.loginBtn--google {
  font-family: "Roboto", Roboto, arial, sans-serif;
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}
</style>




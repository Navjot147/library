import Vue from "vue";
import GAuth from "vue-google-oauth2";
import VueRouter from "vue-router";
import config from "./config";
import store from "./store";
// Components
import App from "./App.vue";
import Auth from "./components/Auth.vue";
import Search from "./components/Search.vue";
import Detail from "./components/Detail.vue";

Vue.config.productionTip = false;
const gauthOption = {
  clientId: config.googleClientId,
  scope: "profile email",
  prompt: "select_account"
};
function requireAuth(to, from, next) {
  if (!localStorage.getItem("userInfo")) {
    next({
      path: "/auth"
    });
  } else {
    next();
  }
}
const routes = [
  { path: "/auth", component: Auth, props: { authtype: "google" } },
  { path: "/search", component: Search, beforeEnter: requireAuth },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    beforeEnter: requireAuth
  }
];
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes
});
Vue.use(GAuth, gauthOption);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");

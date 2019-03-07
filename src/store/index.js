import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import books from './books';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    books
  },
  strict: debug
})
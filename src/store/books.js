import { searchBooks } from "../api/books";
const state = {
  searchResult: [],
  searchError: "",
  bookData: {}
};

// getters
const getters = {
  getLoginState: state => {
    return state.login;
  }
};

// actions
const actions = {
  async getSearchResult({ commit }, { query, typeId }) {
    try {
      const res = await searchBooks(query.replace(" ", "+"), typeId);
      let responseJson = await res.json();
      responseJson =
        typeId === 1
          ? responseJson.docs || []
          : { name: responseJson["ISBN:" + query] };
      commit("setSearchedData", responseJson, false, typeId, query);
    } catch (er) {
      commit("setSearchedData", { error: true });
    }
  },
  clearSearchResults({ commit }) {
    commit("clear");
  },
  getBooksData({ commit, state }, id) {
    const matchedBook = state.searchResult.find(
      book => book.key.indexOf(id) > -1
    );
    commit("setBookData", matchedBook);
  }
};

// mutations
const mutations = {
  setSearchedData(state, result) {
    if (result.error) {
      state.searchError = result;
    } else {
      state.searchResult = result;
    }
  },
  clear() {
    (state.searchResult = []), (state.searchError = "");
  },
  setBookData(state, bookData) {
    state.bookData = bookData;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

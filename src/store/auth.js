const state = {
  login: false,
  userData: {
    email: "",
    name: "",
    token: ""
  }
};

// getters
const getters = {
  getLoginState: (state) => {
    return state.login;
  },
};

// actions
const actions = {
  saveAuthData({ commit, state }, authData) {
    localStorage.setItem("userInfo", JSON.stringify(authData));
    commit("setAuthData", authData);
  }
};

// mutations
const mutations = {
  setAuthData(state, authData) {
    state.login = true;
    state.userData = authData;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

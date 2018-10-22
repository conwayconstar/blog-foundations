// Account state
export const state = () => ({
  user: null,
});

// Account actions
export const actions = {
  GET_USER({commit}) {
    // Send request to check user against cookie
    return this.$axios.get('api/v1/user/check')
      .then(res => {
        // Mutate the user state with logged in user
        commit('SET_USER', res.data);
        return res;
      })
      .catch(error => {
        // Mutate the user state to null
        commit('SET_USER');
        return error;
      })
  },

  USER_LOGIN({commit}, data) {
    // Send request to log in the user
    return this.$axios.put('api/v1/user/login', data)
      .then(res => {
        // Mutate the user state with logged in user
        commit('SET_USER', res.data);
        return res;
      });
  },

  USER_REGISTER({commit}, data) {
    // Send a request to register the user
    return this.$axios.post('api/v1/user/create', data)
      .then(res => {
        // Mutate the user state with newly registered  user
        commit('SET_USER', res.data);
        return res;
      });
  }
};

// Account mutations
export const mutations = {
  SET_USER(state, user) {
    // Mutate the user state
    state.user = user.id ? user : null;
  }
};

// Account getters
export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  }
};

// Store state
export const state = () => ({});

// Store Actions
export const actions = {
  nuxtServerInit({dispatch}, {req}) {
    return new Promise((resolve, reject) => {
      // Reset Axios default headers
      this.$axios.defaults.headers.common = {};
      // Match Axios default headers with request headers
      Object.keys(req.headers).map((key) => this.$axios.defaults.headers.common[key] = req.headers[key]);
      // dispatch GET_USER
      dispatch('account/GET_USER')
        .then(res => {
          resolve(true)
        })
        .catch(error => {
          console.log('Provided token is invalid:', error);
          resolve(false)
        });
    });
  },
};

// Store Mutations
export const mutations = {};



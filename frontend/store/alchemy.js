export const state = () => ({
  page_keys: {},
});


export const getters = {
  getPageKeys(state) {
    return state.page_keys
  },
  getNextPageKey: (state) => (index) => {
    const page_keys =state.page_keys
    // console.log("inner", page_keys[index])
    if (page_keys[index]) {
      const next_page_key = page_keys[index].slice(-1).pop()
      return next_page_key
    }
    return null
  },
};

export const actions = {
  addPageKey({ commit }, { index, key }) {
    // console.log("addPageKey", index, key)
    commit('setPageKeys', { index: index, key: key })
  },
  popPageKey({commit}, index) {
    commit('popPageKey', index)
  },
};
export const mutations = {
  setPageKeys(state, { index, key }) {
    if (!state.page_keys[index]) {
      state.page_keys[index] = [key]
    } else {
      state.page_keys[index].push(key)
    }
  },
  popPageKey(state, index) {
    state.page_keys[index].pop()
  }
};
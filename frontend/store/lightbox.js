

export const state = () => ({
  lightbox_image_url: null,
  lightbox_image_width: null,
});


export const getters = {
  getLightboxImage(state) {
    return state.lightbox_image_url
  },
  getLightboxImageWidth(state) {
    return state.lightbox_image_width
  },
};

export const actions = {
  clearLightbox({commit}) {
    commit("setLightboxImage", null);
    commit("setLightboxWidth", null);
  },
  addImageToLightbox({commit}, context) {
    commit('setLightboxImage', context.image)
    commit('setLightboxWidth', context.width)
  }
};

export const mutations = {
  setLightboxImage(state, image_url) {
    state.lightbox_image_url = image_url
  },
  setLightboxWidth(state, width) {
    state.lightbox_image_width = width
  },
};
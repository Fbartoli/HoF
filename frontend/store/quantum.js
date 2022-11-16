

export const state = () => ({
  projects_data: [],
});


export const getters = {
  getProjectsData(state) {
    return state.projects_data
  },
};

export const actions = {
  async initProjectsData({ commit }) {
    const endpoint_url = "https://rugquantum.s3.amazonaws.com/projects.json"
    const projects_data = await this.$axios.get(endpoint_url).then((response) => {
      const projects_data = response.data
      // console.log('projects_data', projects_data)
      return projects_data
    }).catch((error) => {
      console.log(error)
      return []
    })
    commit('setProjectsData', projects_data)
  },
};
export const mutations = {
  setProjectsData(state, data) {
    state.projects_data = data
  },
};
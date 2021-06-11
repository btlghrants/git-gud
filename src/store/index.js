import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    levels: [],
    roles: [],
    focuses: [],
    qualities: [],
    topics: [],
    modalities: [],
    resources: [],
    recommendations: []
  },
  mutations: {
    dataLoad(state, data) {
      state.levels = data.levels;
      state.roles = data.roles;
      state.focuses = data.focuses;
      state.qualities = data.qualities;
      state.topics = data.topics;
      state.modalities = data.modalities;
      state.resources = data.resources;
      state.recommendations = data.recommendations;
    }
  },
  actions: {
  },
  modules: {
  }
})

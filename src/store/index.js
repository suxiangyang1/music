import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// })

const store = new Vuex.Store({
  state: {
    name: '',
    avatar: ''
  },
  mutations: {},
  actions: {}
})
export default store

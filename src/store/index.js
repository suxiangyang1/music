// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// // export default new Vuex.Store({
// //   state: {},
// //   mutations: {},
// //   actions: {},
// //   modules: {}
// // })

// const store = new Vuex.Store({
//   state: {
//     name: '',
//     avatar: ''
//   },
//   mutations: {},
//   actions: {}
// })
// export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断底部播放是否加载
    footer: true,
    showfooter: true,
    uid: 0,
    songid: [],
    src: '1',
    user: [],
    audio: {
      //当前播放时间
      currentTime: 0,
      maxTime: 0
    },
    playtime: 0,
    current: ''
  },
  getters: {},
  mutations: {},
  actions: {}
})

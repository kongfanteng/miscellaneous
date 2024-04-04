// 安装Vuex；创建createStore;
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count += 1
      },
      init(state, count) {
        state.count = count
      },
    },
    actions: {
      getCount({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('init', parseInt(Math.random() * 100))
            resolve()
          }, 1000)
        })
      },
    },
  })
}

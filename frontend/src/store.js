import { createStore } from 'vuex';

const store = createStore({
  state: {
    darkMode: false // 默认关闭黑夜模式
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode; // 切换黑夜模式
    },
    setDarkMode(state, value) {
      state.darkMode = value; // 直接设置黑夜模式状态
    }
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
    enableDarkMode({ commit }) {
      commit('setDarkMode', true);
    },
    disableDarkMode({ commit }) {
      commit('setDarkMode', false);
    }
  },
  getters: {
    isDarkMode: (state) => state.darkMode
  }
});

export default store;
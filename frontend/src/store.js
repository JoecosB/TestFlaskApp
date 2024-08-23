import { createStore } from 'vuex';

// 尝试从 localStorage 中读取保存的夜间模式状态
const savedDarkMode = localStorage.getItem('darkMode') === 'true';

const store = createStore({
  state: {
    darkMode: savedDarkMode || false // 如果 localStorage 中有保存的状态，则使用它，否则默认关闭
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode); // 保存状态到 localStorage
    },
    setDarkMode(state, value) {
      state.darkMode = value;
      localStorage.setItem('darkMode', state.darkMode); // 保存状态到 localStorage
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
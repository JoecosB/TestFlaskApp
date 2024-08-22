<template>
  <div :class="['home-page', {'dark-mode' : isDarkMode}]">
    <section :class="['hero', {'dark-mode' : isDarkMode}]">
      <h1>Welcome to JutasITe</h1>
      <p>欢迎来到JutasITe！我会在这个网站放一些我自己做过的项目，希望能够向路过的人提供一些有意义的信息。</p>
    </section>
    <section :class="['features', {'dark-mode' : isDarkMode}]">
      <h2>涉及到的领域</h2>
      <div class="tags-container">
        <span class="tag">JavaScript</span>
        <span class="tag">Python</span>
        <span class="tag">Docker</span>
        <span class="tag">HTML</span>
        <span class="tag">CSS</span>
        <span class="tag">Vue.js</span>
        <span class="tag">MicroPython</span>
        <span class="tag">ESP8266</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'HomePage',
  computed: {
    ...mapState(['darkMode']),
    ...mapGetters(['isDarkMode']),
  }
};
</script>

<style>
.home-page {
  padding: 20px;
  background-color: transparent;
}

.hero {
  background: linear-gradient(270deg, #ff7e5f, #feb47b);
  background-size: 400% 400%;
  color: white;
  text-align: center;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  animation: gradientBackground 5s ease infinite;
}

@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  transition: color 0.3s, background-color 0.3s;
}

.hero p {
  font-size: 1.2em;
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.3s, background-color 0.3s;
}

.features {
  background-color: #f9f9f9;
  padding: 40px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.3s, background-color 0.3s;
}

.features h2 {
  font-size: 2em;
  margin-bottom: 20px;
  transition: color 0.3s, background-color 0.3s;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  transition: color 0.3s, background-color 0.3s;
}

.tag {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.3s, background-color 0.3s;
}

.dark-mode .hero {
  background: linear-gradient(270deg, #4b0082, #000080);
  color: #e0e0e0;
}

.dark-mode .hero h1 {
  color: #ffffff;
}

.dark-mode .hero p {
  color: #cccccc;
}

.dark-mode .features {
  background-color: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-mode .features h2 {
  color: #ffffff;
}

.dark-mode .tag {
  background-color: #1e1e1e;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
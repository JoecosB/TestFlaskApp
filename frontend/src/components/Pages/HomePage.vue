<template>
  <div class="home-page">
    <section class="hero">
      <h1>Welcome to JutasITe</h1>
      <p>欢迎来到JutasITe！我会在这个网站放一些我自己做过的项目，希望能够向路过的人提供一些有意义的信息。</p>
    </section>
    <section class="features">
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
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.hero {
  background: linear-gradient(270deg, #ff7e5f, #feb47b);
  background-size: 400% 400%;
  color: white;
  text-align: center;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 40px;
  animation: gradientBackground 10s ease infinite;
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
}

.hero p {
  font-size: 1.2em;
  max-width: 600px;
  margin: 0 auto;
}

.about {
  margin-bottom: 40px;
}

.features {
  background-color: #f9f9f9;
  padding: 40px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.features h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.tag {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
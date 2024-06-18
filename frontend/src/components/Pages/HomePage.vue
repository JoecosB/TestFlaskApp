<template>
  <div class="home-page">
    <section class="hero">
      <h1>Welcome to JutasITe</h1>
      <p>欢迎来到JutasITe!在这里，你可以享受烫烫烫的美味锟斤铐😋</p>
      <button @click="navigateTo('services')">Our Services</button>
      <div>Try our Services!!!</div>
    </section>
    <section class="about">
      <h2>About Us</h2>
      <p>我们提供很棒的妙妙服务，我们相信这个世界是一个巨大的米奇妙妙屋。哼哼哼，啊啊啊啊，啊啊啊啊啊啊啊啊啊！！！！</p>
    </section>
    <section class="features">
      <h2>Our Features</h2>
      <div class="features-container">
        <div class="feature">
          <h3>Feature 1</h3>
          <p>Detail about feature 1.</p>
        </div>
        <div class="feature">
          <h3>Feature 2</h3>
          <p>Detail about feature 2.</p>
        </div>
        <div class="feature">
          <h3>Feature 3</h3>
          <p>Detail about feature 3.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    }
  }
}
</script>

<style scoped>
.home-page {
  text-align: center;
}

.hero {
  background-color: #f0f0f0;
  padding: 20px;
}

.hero h1 {
  color: #333;
}

.hero p {
  color: #666;
}

.features-container {
  display: flex;
  justify-content: space-around;
}

.feature {
  margin: 20px;
  padding: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

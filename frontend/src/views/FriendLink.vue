<template>
  <div class="friends-page">
    <h1>友情链接</h1>
    <ul class="friends-list">
      <li v-for="friend in friends" :key="friend.url" :class="['friend-item', {'dark-mode' : isDarkMode}]">
        <a :href="friend.url" target="_blank" rel="noopener noreferrer">
          <div class="friend-content">
            <div class="friend-icon">
              <img :src="friend.icon" alt="Icon" style="width: 64px;height: 64px;border-radius: 3px"/>
            </div>
            <div class="friend-info">
              <h3>{{ friend.name }}</h3>
              <p v-html="friend.description"></p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'FriendsPage',
  computed: {
    ...mapState(['darkMode']),
    ...mapGetters(['isDarkMode']),
  },
  data() {
    return {
      friends: [
        {
          name: 'Bootstrap中文网',
          url: 'https://www.bootcss.com',
          description: '我们一直致力于为广大开发者提供更多的优质技术文档和辅助开发工具！',
          icon: 'https://www.bootcss.com/assets/favicons/favicon.ico'
        },
        {
          name: '银河渡舟Blog',
          url: 'https://suborbit.net/',
          description: '天知道这个家伙<p style="font-size: 0.7em;display: inline">最近又在折腾啥</p>',
          icon: 'https://suborbit.net/assets/avatar.png'
        }
      ]
    };
  },
};
</script>

<style scoped>
.friends-page {
  padding: 20px;
}

.friends-list {
  list-style: none;
  padding: 0;
}

.friend-item {
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s;
}

.friend-content {
  display: flex;
  align-items: center;
}

.friend-icon {
  margin-right: 10px;
}

.friend-item a {
  text-decoration: none;
  color: #333;
  display: block;
}

.friend-item:hover {
  text-decoration: none;
  background-color: cornflowerblue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.friend-item h3 {
  margin: 0;
  font-size: 1.25rem;
}

.friend-item p {
  margin: 10px 0 0;
  color: #666;
  font-size: 0.875rem;
}

.dark-mode .friend-item {
  background-color: #333333;
}

.dark-mode .friend-item a {
  text-decoration: none;
  color: #bbbbbb;
  display: block;
}

.dark-mode .friend-item:hover {
  background-color: darkslateblue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const routes = [
   '/',
   '/blog',
   '/friendlink',
   '/blog/Docker学习笔记(2)',
   '/blog/Docker学习笔记(1)',
    '/blog/使用markdown-it渲染markdown文本',
    '/blog/使用highlightjs-line-numbers.js为markdown渲染提供行号',
    '/blog/使用ssh在外网连接局域网内的树莓派',
    '/blog/如何给华硕路由器刷梅林固件',
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://jutasite.top/' });
  const writeStream = createWriteStream(resolve(__dirname, 'public/sitemap.xml'));

  sitemap.pipe(writeStream);

  routes.forEach(route => {
    sitemap.write({
      url: route,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  sitemap.end();

  // 处理流完成的 Promise
  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

generateSitemap()
  .then(() => {
    console.log('Sitemap 生成成功');
  })
  .catch((err) => {
    console.error('生成 Sitemap 时出错:', err);
  });
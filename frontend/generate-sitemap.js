const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const routes = [
  '/',
  '/blog',
  '/friendlink',
  '/blog/:id',
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://www.example.com' });
  const writeStream = createWriteStream(resolve(__dirname, 'public/sitemap.xml'));

  sitemap.pipe(writeStream);

  routes.forEach(route => {
    sitemap.write({
      url: route,
      changefreq: 'daily',
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
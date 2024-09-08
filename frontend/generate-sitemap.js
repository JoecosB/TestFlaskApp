const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const routes = [
   '/',
   '/blog',
   '/friendlink',
   '/blog/Docker&#x5B66;&#x4E60;&#x7B14;&#x8BB0;(2)',
   '/blog/Docker&#x5B66;&#x4E60;&#x7B14;&#x8BB0;(1)',
    '/blog/&#x4F7F;&#x7528;markdown-it&#x6E32;&#x67D3;markdown&#x6587;&#x672C;',
    '/blog/&#x4F7F;&#x7528;highlightjs-line-numbers.js&#x4E3A;markdown&#x6E32;&#x67D3;&#x63D0;&#x4F9B;&#x884C;&#x53F7;',
    '/blog/&#x4F7F;&#x7528;ssh&#x5728;&#x5916;&#x7F51;&#x8FDE;&#x63A5;&#x5C40;&#x57DF;&#x7F51;&#x5185;&#x7684;&#x6811;&#x8393;&#x6D3E;',
    '/blog/&#x5982;&#x4F55;&#x7ED9;&#x534E;&#x7855;&#x8DEF;&#x7531;&#x5668;&#x5237;&#x6885;&#x6797;&#x56FA;&#x4EF6;',
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
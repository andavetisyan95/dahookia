module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dahookia.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: 'public',
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://dahookia.com/server-sitemap.xml',
    ],
  },
};

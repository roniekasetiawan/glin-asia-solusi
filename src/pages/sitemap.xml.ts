import { blogPosts } from '../data/blogPosts';

const site = 'https://glinasiasolusi.id';
const staticPages = [
  '/',
  '/services/',
  '/services/accounting-service/',
  '/services/tax-service/',
  '/services/finance-assistant/',
  '/about/',
  '/contact/',
  '/blog/'
];

export function GET() {
  const urls = [
    ...staticPages,
    ...blogPosts.map((post) => `/blog/${post.slug}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${site}${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

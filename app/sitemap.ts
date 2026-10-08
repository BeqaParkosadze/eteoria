import { ARTICLES } from '../src/data/articles';

export default function sitemap() {
  const baseUrl = 'https://eteoria.online';
  const currentDate = new Date();

  const articleEntries = ARTICLES.map((article) => ({
    url: `${baseUrl}/statiiebi/${article.slug}`,
    lastModified: new Date(article.dateModified || currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tickets`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/statiiebi`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...articleEntries,
  ];
}

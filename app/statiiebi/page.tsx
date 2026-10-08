import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES, ARTICLE_CATEGORIES } from '../../src/data/articles';

export const metadata: Metadata = {
  title: 'საგამოცდო გზამკვლევები, წესები და რჩევები | eTeoria',
  description:
    'თეორიული გამოცდის გზამკვლევები, საგზაო მოძრაობის წესები, B, A, C, D კატეგორიები და იარაღის გამოცდის ბილეთების ანალიზი.',
  alternates: {
    canonical: 'https://eteoria.online/statiiebi',
  },
  openGraph: {
    title: 'საგამოცდო გზამკვლევები, წესები და რჩევები | eTeoria',
    description:
      'თეორიული გამოცდის გზამკვლევები, საგზაო მოძრაობის წესები, B, A, C, D კატეგორიები და იარაღის გამოცდის ბილეთების ანალიზი.',
    url: 'https://eteoria.online/statiiebi',
    type: 'website',
  },
};

export default function ArticlesPage() {
  const jsonLdItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'საგამოცდო გზამკვლევები და რჩევები',
    description: 'eTeoria-ს ოფიციალური საგამოცდო სტატიები, რჩევები და საგზაო წესები',
    itemListElement: ARTICLES.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: article.title,
      url: `https://eteoria.online/statiiebi/${article.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0d1117] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← მთავარ გვერდზე დაბრუნება
          </Link>
          <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
            eTeoria ცოდნის ბაზა
          </span>
        </div>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold border border-indigo-200 dark:border-indigo-800">
            📚 ოფიციალური გზამკვლევები 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            საგამოცდო გზამკვლევები, წესები და რჩევები
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            ყველაფერი, რაც უნდა იცოდეთ მართვის მოწმობისა (B, A, C, D) და იარაღის თეორიული გამოცდის პირველივე ცდაზე ჩასაბარებლად.
          </p>
        </header>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {article.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={`/statiiebi/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <time className="text-xs text-slate-500" dateTime={article.datePublished}>
                  {article.datePublished}
                </time>
                <Link
                  href={`/statiiebi/${article.slug}`}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  სრულად წაკითხვა →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

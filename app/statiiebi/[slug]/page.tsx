import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '../../../src/data/articles';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ARTICLES.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    return {
      title: 'სტატია ვერ მოიძებნა | eTeoria',
    };
  }

  const url = `https://eteoria.online/statiiebi/${article.slug}`;

  return {
    title: `${article.title} | eTeoria`,
    description: article.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${article.title} | eTeoria`,
      description: article.metaDescription,
      url: url,
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ['eTeoria'],
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | eTeoria`,
      description: article.metaDescription,
      images: ['/og-image.png'],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = ARTICLES.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: `https://eteoria.online/statiiebi/${article.slug}`,
    author: {
      '@type': 'Organization',
      name: 'eTeoria',
      url: 'https://eteoria.online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'eTeoria',
      url: 'https://eteoria.online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://eteoria.online/favicon.ico',
      },
    },
  };

  return (
    <article className="min-h-screen bg-slate-100 dark:bg-[#0d1117] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            მთავარი
          </Link>
          <span>/</span>
          <Link href="/statiiebi" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            სტატიები
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 truncate">{article.category}</span>
        </nav>

        {/* Header Container */}
        <header className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">⏱️ {article.readTime}</span>
            <span className="text-xs text-slate-500 font-medium">📅 {article.datePublished}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-l-4 border-indigo-600 pl-4 py-1">
            {article.excerpt}
          </p>
        </header>

        {/* Content Container */}
        <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] space-y-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {section.heading}
              </h2>
              <div className="text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}

          {/* Call to action box */}
          <div className="mt-10 p-6 sm:p-8 bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-indigo-950 dark:text-indigo-200">
                მზად ხარ თეორიის ჩასაბარებლად?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                ივარჯიშე ოფიციალურ საგამოცდო ბილეთებზე რეალური ტაიმერითა და შეცდომების ბანკით.
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform active:translate-y-0.5 whitespace-nowrap"
            >
              გამოცდის დაწყება 🚀
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/statiiebi"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← ყველა სტატიის ნახვა
          </Link>
        </div>
      </div>
    </article>
  );
}

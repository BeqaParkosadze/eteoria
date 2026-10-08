import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Check, 
  Layers
} from 'lucide-react';
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles';

export default function ArticlesView({
  articleSlug = null,
  onSelectArticle,
  onBackToArticles,
  onBackToDashboard,
  onStartExam
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copied, setCopied] = useState(false);

  // Active single article (if slug is provided)
  const activeArticle = articleSlug ? ARTICLES.find(a => a.slug === articleSlug) : null;

  // Filtered articles for catalog
  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.categoryKey === selectedCategory);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // If viewing a single article
  if (activeArticle) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
          <button
            onClick={onBackToArticles}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ყველა სტატია</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
              title="ბმულის კოპირება"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-black">დაკოპირდა</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>გაზიარება</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Article Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <button onClick={onBackToDashboard} className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400">
            მთავარი
          </button>
          <span>/</span>
          <button onClick={onBackToArticles} className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400">
            სტატიები
          </button>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 truncate">{activeArticle.category}</span>
        </nav>

        {/* Article Header Card */}
        <header className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 sm:p-8 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800">
              {activeArticle.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeArticle.readTime}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeArticle.datePublished}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
            {activeArticle.title}
          </h1>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#161b22] border-2 border-indigo-200 dark:border-indigo-900/60 text-slate-700 dark:text-slate-300 text-sm font-bold leading-relaxed shadow-sm">
            {activeArticle.excerpt}
          </div>
        </header>

        {/* Article Content Sections */}
        <div className="space-y-6">
          {activeArticle.sections.map((section, idx) => (
            <section 
              key={idx}
              className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 sm:p-7 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] space-y-3"
            >
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                <span>{section.heading}</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Card to Practice Exam */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-900 dark:to-indigo-950 text-white border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#0f172a] dark:shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-white/20 text-white mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>eTeoria სიმულატორი</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              მზად ხარ თეორიის ჩასაბარებლად?
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-md">
              ივარჯიშე ოფიციალურ საგამოცდო ბილეთებზე რეალური ტაიმერითა და შეცდომების ბანკით.
            </p>
          </div>
          <button
            onClick={onStartExam}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-slate-100 border-2 border-slate-900 font-black text-xs sm:text-sm shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>გამოცდის დაწყება</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Back link */}
        <div className="pt-2 text-center">
          <button
            onClick={onBackToArticles}
            className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            ← დაბრუნება ყველა სტატიის კატალოგში
          </button>
        </div>
      </div>
    );
  }

  // Catalog View (Overview)
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Return to Dashboard */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>მთავარზე დაბრუნება</span>
        </button>

        <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          სულ {filteredArticles.length} სტატია
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>საგამოცდო ცოდნის ბაზა • 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
          საგამოცდო გზამკვლევები, წესები და რჩევები
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold max-w-3xl leading-relaxed">
          ყველაფერი რაც უნდა იცოდეთ მართვის მოწმობისა (B, A, C, D) და იარაღის თეორიული გამოცდის პირველივე ცდაზე წარმატებით ჩასაბარებლად.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
        {ARTICLE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#fff]'
                  : 'bg-white dark:bg-[#21262d] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="bg-white dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
                <button
                  type="button"
                  onClick={() => onSelectArticle(article.slug)}
                  className="text-left cursor-pointer focus:outline-none"
                >
                  {article.title}
                </button>
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-bold line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-bold">
                {article.datePublished}
              </span>
              <button
                type="button"
                onClick={() => onSelectArticle(article.slug)}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border-2 border-slate-900 dark:border-slate-700 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                aria-label={`სრულად წაკითხვა: ${article.title}`}
              >
                <span>სრულად</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Play, 
  Bookmark, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trash2, 
  History, 
  BarChart3, 
  BookOpen,
  Car,
  Bike,
  Truck,
  Bus,
  Wrench,
  Shield,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { CATEGORIES } from '../utils/constants';
import { getT } from '../utils/i18n';
import { calculateStats } from '../utils/storage';
import FaqSection from './FaqSection';
import GuidesSection from './GuidesSection';

export default function Dashboard({
  examHistory = [],
  mistakesBank = [],
  currentCategory,
  onSelectCategory,
  currentLanguage,
  examMistakesLimit = 3,
  onSetExamMistakesLimit = () => {},
  onStartExam,
  onNavigateToStudy,
  onStartMistakesPractice,
  onReviewPastExam,
  onClearHistory,
  onClearMistakes,
  onOpenSearch,
  onNavigateToArticles
}) {
  const t = getT(currentLanguage);
  const stats = calculateStats(examHistory);
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState('ALL');

  const activeCategoryObj = CATEGORIES.find(c => c.id === currentCategory) || CATEGORIES[0];

  const filteredHistory = historyCategoryFilter === 'ALL'
    ? examHistory
    : examHistory.filter(h => h.category === historyCategoryFilter);

  return (
    <div className="space-y-7 animate-fade-in">
      
      {/* ========================================================
          1. QUICK STATS CARDS (Top Section)
         ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {t.quickStats}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              თეორიული გამოცდის მზადყოფნის ანალიტიკა • eteoria.online
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-500 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ოფიციალური 2026 სტანდარტი
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Total Tests Taken */}
          <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.totalTests}
              </span>
              <div className="w-8 h-8 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {stats.totalTests}
              </span>
              <span className="text-xs text-slate-400 font-bold">{t.testsUnit || 'ტესტი'}</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1">
              <span className="text-emerald-700 dark:text-emerald-400">{stats.passedCount} {t.passedCountLabel || 'ჩაბარებული'}</span>
              <span>•</span>
              <span className="text-rose-600 dark:text-rose-400">{stats.failedCount} {t.failedCountLabel || 'ჩაჭრილი'}</span>
            </div>
          </div>

          {/* Pass Rate (%) */}
          <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.passRate}
              </span>
              <div className={`w-8 h-8 rounded-2xl border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                stats.passRate >= 80 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : stats.passRate > 0 
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {stats.passRate}%
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-900 dark:border-slate-700 ${
                stats.passRate >= 80 
                  ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100' 
                  : stats.passRate > 0 
                  ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {stats.passRate >= 90 ? (t.readinessReady || 'მზადაა') : stats.passRate >= 70 ? (t.readinessMid || 'საშუალო') : (t.readinessPractice || 'ვარჯიში')}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
              {t.barrierText || 'ბარიერი: 27/30 (90%)'}
            </div>
          </div>

          {/* Average Time per Question */}
          <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.avgTimePerQuestion}
              </span>
              <div className="w-8 h-8 rounded-2xl bg-blue-50 dark:bg-blue-950 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {stats.avgTimePerQuestion}
              </span>
              <span className="text-xs text-slate-400 font-bold">სექ</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
              მაქსიმუმი: 60 წმ / კითხვაზე
            </div>
          </div>

          {/* Mistakes Bank Count */}
          <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.practiceMistakes}
              </span>
              <div className="w-8 h-8 rounded-2xl bg-rose-100 dark:bg-rose-950 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center text-rose-600 dark:text-rose-300 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {mistakesBank.length}
              </span>
              <span className="text-xs text-slate-400 font-bold">{t.savedMistakes || 'ბანკში'}</span>
            </div>
            <div className="mt-2 text-[11px] font-bold">
              {mistakesBank.length > 0 ? (
                <button
                  onClick={onStartMistakesPractice}
                  className="text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-0.5"
                >
                  {t.repeatMistakesBtn || 'შეცდომების გამეორება'} <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-400">{t.noMistakesYet || 'შეცდომები არ გაქვთ!'}</span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          2. HERO ACTION HUB (Playful Light Neo-Brutalist Card)
         ======================================================== */}
      <div className="w-full bg-white dark:bg-[#161b22] rounded-4xl p-6 sm:p-8 md:p-10 text-slate-900 dark:text-slate-100 border-2 border-slate-900 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_#000] relative overflow-hidden transition-colors">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>eTeoria • eteoria.online</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 dark:text-white">
              <span>{t.heroTitleMain || 'მართვის მოწმობის'}</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 dark:from-indigo-400 dark:to-violet-400">
                {t.heroTitleSub || 'თეორიული გამოცდა'}
              </span>
              <span className="sr-only"> • საგამოცდო ბილეთები 2026</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-bold">
              {t.heroDesc || '30-კითხვიანი რეალური საგამოცდო სიმულაცია, ბილეთების სრული კატალოგი და მომენტალური შემოწმება საქართველოს შსს მომსახურების სააგენტოს სტანდარტით.'}
            </p>

            {/* Quick Category Selector Badges */}
            <div className="pt-2">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                {t.selectCategoryLabel || 'აირჩიეთ კატეგორია:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const isCurrent = cat.id === currentCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-150 flex items-center gap-1.5 border-2 min-h-[36px] ${
                        isCurrent
                          ? 'bg-indigo-600 text-white border-slate-900 dark:border-indigo-400 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Hero Buttons (Right Column) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 bg-slate-50 dark:bg-[#21262d] p-5 sm:p-6 rounded-3xl border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_#000]">
            
            {/* Exam Rules Toggle: Official vs Practice */}
            <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl border-2 border-slate-900 dark:border-slate-600 flex items-center justify-between gap-1 text-xs font-black min-h-[44px]">
              <button
                type="button"
                onClick={() => onSetExamMistakesLimit(3)}
                className={`flex-1 py-2 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 min-h-[36px] ${
                  examMistakesLimit === 3
                    ? 'bg-indigo-600 text-white shadow-sm border border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t.officialRulesMode || 'ოფიციალური (მაქს. 3)'}</span>
              </button>
              <button
                type="button"
                onClick={() => onSetExamMistakesLimit(5)}
                className={`flex-1 py-2 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 min-h-[36px] ${
                  examMistakesLimit === 5
                    ? 'bg-indigo-600 text-white shadow-sm border border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t.practiceRulesMode || 'სავარჯიშო (მაქს. 5)'}</span>
              </button>
            </div>

            {/* START REAL EXAM BUTTON (Neo-Brutalist Tactile) */}
            <button
              onClick={() => onStartExam('exam')}
              className="w-full group bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base py-4 px-6 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between transition-all min-h-[52px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black tracking-tight">
                    {t.startRealExam}
                  </div>
                  <div className="text-[11px] text-indigo-100 font-bold">
                    {t.categoryPrefix || 'კატეგორია'} {activeCategoryObj.name} • 30 {t.questionsWord || 'კითხვა'} • {t.maxMistakesPrefix || 'მაქს.'} {examMistakesLimit} {t.mistakesWord || 'შეცდომა'}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* STUDY MODE / ALL TICKETS BUTTON */}
            <button
              onClick={onNavigateToStudy}
              className="w-full group bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-sm py-3 px-5 rounded-2xl border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 dark:text-white">
                    {t.studyModeLong || t.studyMode}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                    {t.studyModeDesc}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* PRACTICE MISTAKES BUTTON */}
            <button
              onClick={onStartMistakesPractice}
              disabled={mistakesBank.length === 0}
              className={`w-full group font-black text-sm py-3 px-5 rounded-2xl border-2 border-slate-900 dark:border-slate-600 min-h-[48px] flex items-center justify-between transition-all ${
                mistakesBank.length > 0
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-950/60 shadow-[3px_3px_0px_0px_rgba(244,63,94,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50 shadow-none'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 ${
                  mistakesBank.length > 0 ? 'bg-rose-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  <Bookmark className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 dark:text-white">
                    {t.practiceMistakes}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                    {mistakesBank.length} {t.mistakesCount}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================
          3. EXAM SIMULATOR HISTORY TABLE
         ======================================================== */}
      <div className="w-full bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_0px_#000]">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {t.historyTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
              ჩაბარებული და განვლილი საგამოცდო სესიების სრული ჟურნალი
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <select
              value={historyCategoryFilter}
              onChange={(e) => setHistoryCategoryFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black rounded-xl px-3 py-1.5 focus:outline-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="ALL">{t.filterAll}</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {examHistory.length > 0 && (
              <button
                onClick={onClearHistory}
                aria-label={t.clearHistory || 'ისტორიის გასუფთავება'}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border-2 border-slate-900 dark:border-slate-700 rounded-xl transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-white dark:bg-slate-800"
                title={t.clearHistory}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="mt-4 overflow-x-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center text-slate-400 mx-auto mb-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000]">
                <HelpCircle className="w-6 h-6 text-slate-900 dark:text-white" />
              </div>
              <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">
                {t.noHistory}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 font-bold">
                გაიარეთ თქვენი პირველი 30-კითხვიანი სიმულაცია ან დაიწყეთ ბილეთების სწავლა.
              </p>
              <button
                onClick={() => onStartExam('exam')}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-indigo-500 transition"
              >
                {t.startRealExam}
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">{t.tableDate}</th>
                  <th className="py-3 px-3">{t.tableCategory}</th>
                  <th className="py-3 px-3">{t.tableScore}</th>
                  <th className="py-3 px-3">{t.tableMistakes}</th>
                  <th className="py-3 px-3">{t.tableDuration}</th>
                  <th className="py-3 px-3">{t.tableResult}</th>
                  <th className="py-3 px-3 text-right">{t.tableAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {filteredHistory.map((item) => {
                  const dateStr = new Date(item.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  const durationMin = Math.floor(item.durationSeconds / 60);
                  const durationSec = item.durationSeconds % 60;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {dateStr}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-black text-slate-900 dark:text-white">
                          {item.category}
                        </span>
                        <span className="ml-1 text-[10px] text-slate-400">
                          ({item.language})
                        </span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-black text-slate-900 dark:text-white text-sm">
                          {item.score}
                        </span>
                        <span className="text-slate-400 font-normal"> / {item.totalQuestions}</span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`font-black ${item.mistakesCount > 3 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {item.mistakesCount} / 3 შეცდომა
                        </span>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                        {durationMin}წთ {durationSec}წმ
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {item.passed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-400 dark:border-emerald-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            {t.passedBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-400 dark:border-rose-700">
                            <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                            {t.failedBadge}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap text-right">
                        <button
                          onClick={() => onReviewPastExam(item)}
                          className="px-3 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black text-[11px] transition inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                        >
                          {t.reviewTest}
                          <ChevronRight className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* ========================================================
          4. HOMEPAGE SEO CONTENT ENGINE: GUIDES & ARTICLES
         ======================================================== */}
      <GuidesSection onNavigateToArticles={onNavigateToArticles} />

      {/* ========================================================
          5. HOMEPAGE CONTENT ENGINE: FAQ & INFORMATIONAL ACCORDION
         ======================================================== */}
      <FaqSection />

    </div>
  );
}

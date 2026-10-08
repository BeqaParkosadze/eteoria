import React, { useEffect } from 'react';
import { 
  Trophy, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  AlertTriangle,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { getT } from '../utils/i18n';
import { triggerCelebrationConfetti } from '../utils/confetti';

export default function ResultsView({
  resultData,
  onReviewMistakes,
  onReviewAll,
  onRetakeExam,
  onBackToDashboard,
  currentLanguage = 'Geo'
}) {
  const t = getT(currentLanguage);

  const {
    score = 0,
    totalQuestions = 30,
    mistakesCount = 0,
    passed = false,
    durationSeconds = 0,
    mistakeQuestions = [],
    forcedByTimeout = false,
  } = resultData || {};

  const accuracy = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = `${minutes}წთ ${seconds}წმ`;

  // Trigger celebration confetti on pass!
  useEffect(() => {
    if (passed) {
      triggerCelebrationConfetti();
    }
  }, [passed]);

  return (
    <div className="max-w-3xl mx-auto space-y-7 animate-fade-in py-2">
      
      {/* 1. PASSED / FAILED HERO BANNER */}
      <div className={`p-8 sm:p-10 rounded-4xl border-2 border-slate-900 text-center relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_#000] ${
        passed
          ? 'bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-600'
          : 'bg-rose-50 dark:bg-rose-950/40 dark:border-rose-600'
      }`}>
        
        {/* Decorative Badge Icon */}
        <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] mb-5 ${
          passed
            ? 'bg-emerald-500 text-white'
            : 'bg-rose-500 text-white'
        }`}>
          {passed ? (
            <Trophy className="w-10 h-10 animate-bounce" />
          ) : (
            <XCircle className="w-10 h-10" />
          )}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
          {passed ? t.passedHeading : t.failedHeading}
        </h2>

        <p className="mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-bold">
          {passed ? t.passedSubheading : t.failedSubheading}
        </p>

        {forcedByTimeout && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-2 border-slate-900 dark:border-amber-600">
            <Clock className="w-3.5 h-3.5" />
            <span>დრო ამოიწურა (30:00 ლიმიტი)</span>
          </div>
        )}

        {/* Result Status Pill */}
        <div className="mt-5">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
            passed
              ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-200 dark:bg-rose-900 text-rose-950 dark:text-rose-100'
          }`}>
            {passed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                <span>{t.passedBadge} • 2026 ოფიციალური სტანდარტი დაკმაყოფილებულია</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-700 dark:text-rose-300" />
                <span>{t.failedBadge} • 3 შეცდომის ლიმიტი გადაჭარბებულია</span>
              </>
            )}
          </span>
        </div>

      </div>

      {/* 2. KEY METRICS BREAKDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Score */}
        <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000] text-center">
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t.scoreLabel}
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
            {score} <span className="text-xs text-slate-400 font-bold">/ {totalQuestions}</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 block">
            მინიმუმ 27 ქულა
          </span>
        </div>

        {/* Accuracy */}
        <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000] text-center">
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t.accuracyLabel}
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
            {accuracy}%
          </div>
          <span className={`text-[10px] font-black mt-1 block ${accuracy >= 90 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
            {accuracy >= 90 ? 'ჩაბარების დონე' : 'საჭიროებს გამეორებას'}
          </span>
        </div>

        {/* Mistakes */}
        <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000] text-center">
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t.mistakesLabel}
          </span>
          <div className={`mt-2 text-2xl sm:text-3xl font-black font-['Plus_Jakarta_Sans',sans-serif] ${
            mistakesCount > 3 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
          }`}>
            {mistakesCount} <span className="text-xs text-slate-400 font-bold">/ 3</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 block">
            {mistakesCount <= 3 ? 'ლიმიტის ფარგლებში' : 'ლიმიტი ამოიწურა'}
          </span>
        </div>

        {/* Time Spent */}
        <div className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000] text-center">
          <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t.timeSpentLabel}
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
            {timeFormatted}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 block">
            30:00 ლიმიტი
          </span>
        </div>

      </div>

      {/* 3. ACTION BUTTONS & MISTAKES REVIEW */}
      <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_#000] space-y-4">
        
        <h3 className="text-base font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
          შემდეგი ნაბიჯები და ანალიზი
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Review Mistakes Button */}
          {mistakeQuestions.length > 0 ? (
            <button
              onClick={onReviewMistakes}
              className="w-full sm:flex-1 min-h-[44px] py-3.5 px-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-2 border-slate-900 dark:border-slate-600 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-[3px_3px_0px_0px_rgba(225,29,72,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t.reviewMistakesBtn} ({mistakeQuestions.length})</span>
            </button>
          ) : (
            <div className="w-full sm:flex-1 min-h-[44px] py-3 px-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 text-xs font-black border-2 border-slate-900 dark:border-slate-700 text-center flex items-center justify-center">
              🎉 უშეცდომო შედეგი! 0 შეცდომა!
            </div>
          )}

          {/* Review All Questions */}
          <button
            onClick={onReviewAll}
            className="w-full sm:flex-1 min-h-[44px] py-3.5 px-5 rounded-2xl bg-slate-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(99,102,241,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition"
          >
            <span>{t.reviewAllBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-slate-100 dark:border-slate-800">
          
          <button
            onClick={onRetakeExam}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-black border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.retakeExamBtn}</span>
          </button>

          <button
            onClick={onBackToDashboard}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-black flex items-center justify-center gap-2 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.backToDashboard}</span>
          </button>

        </div>

      </div>

    </div>
  );
}

import React from 'react';
import { BookOpen, Clock, AlertTriangle, RotateCcw, Award, X } from 'lucide-react';
import { getExamRules } from '../utils/i18n';

export default function RulesModal({ isOpen, onClose, currentLanguage = 'Geo' }) {
  if (!isOpen) return null;

  const rules = getExamRules(currentLanguage);
  const ruleIcons = [Clock, AlertTriangle, RotateCcw, Award];
  const iconColors = [
    'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
    'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
    'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#161F30] border-3 border-slate-900 dark:border-slate-700 rounded-3xl shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col text-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                საგამოცდო წესები და სტანდარტები
              </h3>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                საქართველოს შსს მომსახურების სააგენტოს რეგულაცია
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border-2 border-slate-900 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="დახურვა"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3 overflow-y-auto max-h-[70vh]">
          {rules.map((rule, idx) => {
            const IconComponent = ruleIcons[idx % ruleIcons.length];
            return (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${iconColors[idx]}`}>
                  <IconComponent className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {rule.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}

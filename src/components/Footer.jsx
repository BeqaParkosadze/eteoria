import React from 'react';
import { Shield, BookOpen, Bug, Mail } from 'lucide-react';

export default function Footer({ onOpenPrivacy, onOpenRules, onOpenFeedback, onNavigateToArticles }) {
  return (
    <footer className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 flex flex-col gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
      
      {/* Top row: Branding & Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span className="font-black text-slate-900 dark:text-white text-sm">eTeoria</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">• eteoria.online</span>
          <span className="hidden md:inline">• მართვის მოწმობის თეორია</span>
        </div>

        {/* Center: Legal & Feedback Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-black">
          <button
            onClick={onNavigateToArticles}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>სტატიები და გზამკვლევები</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>კონფიდენციალურობის პოლიტიკა</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>წესები</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <button
            onClick={onOpenFeedback}
            className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline transition-colors cursor-pointer"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>ხარვეზის შეტყობინება</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Direct developer contact */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>შენიშვნების შემთხვევაში მოგვწერეთ:</span>
          <a
            href="mailto:farqodev@gmail.com"
            className="text-slate-700 dark:text-slate-300 font-mono font-black hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline ml-0.5"
          >
            farqodev@gmail.com
          </a>
        </div>

        <div>
          <span>© {new Date().getFullYear()} eTeoria • ოფიციალური სტანდარტი</span>
        </div>
      </div>

    </footer>
  );
}

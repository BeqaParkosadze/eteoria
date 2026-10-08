import React from 'react';
import { ShieldCheck, Lock, HardDrive, EyeOff, X } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                კონფიდენციალურობის პოლიტიკა
              </h3>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                თქვენი მონაცემების დაცულობა და უსაფრთხოება
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
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[70vh] text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-bold">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 flex items-start gap-3">
            <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p>
              პლატფორმა <strong>eTeoria (eteoria.online)</strong> შექმნილია მაქსიმალური კონფიდენციალურობის პრინციპით. ჩვენ არ ვითხოვთ რეგისტრაციას და არ ვაგროვებთ პირად საიდენტიფიკაციო მონაცემებს.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
                <HardDrive className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-black text-slate-900 dark:text-white block mb-0.5">
                  1. ლოკალური შენახვა (Local Storage)
                </span>
                <span>
                  თქვენი გამოცდების ისტორია, შეცდომების ბანკი, არჩეული ენა და თემის პარამეტრები ინახება ექსკლუზიურად თქვენსავე ბრაუზერში (LocalStorage) და არ გადაეცემა გარე სერვერებს.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center shrink-0 border border-blue-300 dark:border-blue-700">
                <EyeOff className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-black text-slate-900 dark:text-white block mb-0.5">
                  2. არანაირი თვალთვალი (No Tracking)
                </span>
                <span>
                  ჩვენ არ ვიყენებთ მომხმარებლის მეთვალყურე მესამე მხარის ქუქიებს (Third-party tracking cookies) და არ ვყიდით მონაცემებს სარეკლამო ქსელებზე.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-black text-slate-900 dark:text-white block mb-0.5">
                  3. მონაცემების სრული კონტროლი
                </span>
                <span>
                  ნებისმიერ დროს შეგიძლიათ გაასუფთაოთ თქვენი ისტორია და შეცდომების ბანკი ერთი ღილაკის დაჭერით Dashboard-იდან ან ბრაუზერის მეხსიერების გასუფთავებით.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            გასაგებია
          </button>
        </div>
      </div>
    </div>
  );
}

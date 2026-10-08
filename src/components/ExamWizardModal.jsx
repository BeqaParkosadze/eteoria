import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Bike, 
  Truck, 
  Bus, 
  Wrench, 
  Shield, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Rocket, 
  Sparkles
} from 'lucide-react';
import { CATEGORIES, LANGUAGES } from '../utils/constants';
import { getExamRules, getT } from '../utils/i18n';

const CATEGORY_ICONS = {
  B_B1: Car,
  A_A1: Bike,
  C: Truck,
  C1: Truck,
  D: Bus,
  D1: Bus,
  TS: Wrench,
  Military: Shield,
};

export default function ExamWizardModal({
  isOpen,
  onClose,
  initialCategory = 'B_B1',
  initialLanguage = 'Geo',
  onStartExam,
  examMistakesLimit = 3,
  onSetExamMistakesLimit
}) {
  const [step, setStep] = useState(1); // 1: Category, 2: Language, 3: Rules
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [skipRules, setSkipRules] = useState(() => {
    return localStorage.getItem('skip_exam_rules') === 'true';
  });

  // Keep in sync with initial props when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
      setSelectedLanguage(initialLanguage);
      const isSkip = localStorage.getItem('skip_exam_rules') === 'true';
      setSkipRules(isSkip);
      setStep(1);
    }
  }, [isOpen, initialCategory, initialLanguage]);

  if (!isOpen) return null;

  const t = getT(selectedLanguage);
  const rules = getExamRules(selectedLanguage);

  const handleToggleSkipRules = (checked) => {
    setSkipRules(checked);
    if (checked) {
      localStorage.setItem('skip_exam_rules', 'true');
    } else {
      localStorage.removeItem('skip_exam_rules');
    }
  };

  const handleNextFromStep1 = () => {
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (skipRules) {
      handleFinalStart();
    } else {
      setStep(3);
    }
  };

  const handleFinalStart = () => {
    onStartExam({
      category: selectedCategory,
      language: selectedLanguage,
      mistakesLimit: examMistakesLimit
    });
    onClose();
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];
  const activeLangObj = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      {/* Neo-Brutalist Modal Window */}
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#151D2A] border-3 border-slate-900 dark:border-slate-700 rounded-3xl shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Step Wizard Indicator */}
        <div className="px-5 py-4 border-b-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs border-2 border-slate-900 dark:border-slate-700 shadow-[1px_1px_0px_#0f172a]">
              {step}/3
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                <span>გამოცდის დაწყება</span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {step === 1 && '• 1. კატეგორია'}
                  {step === 2 && '• 2. ენა'}
                  {step === 3 && '• 3. ინსტრუქცია & წესები'}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 shadow-[1px_1px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            aria-label="დახურვა"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 flex">
          <div 
            className="bg-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Dynamic Step Content Body with Framer Motion */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CATEGORY SELECTION */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    აირჩიეთ მართვის მოწმობის კატეგორია
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    ტესტი დაკომპლექტდება არჩეული კატეგორიის ოფიციალური ბაზიდან:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {CATEGORIES.map(cat => {
                    const CatIcon = CATEGORY_ICONS[cat.id] || Car;
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-3 relative ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 shadow-[3px_3px_0px_#4f46e5]'
                            : 'bg-white dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 hover:bg-slate-50 shadow-[1px_1px_0px_#cbd5e1]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-700'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                        }`}>
                          <CatIcon className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{cat.name}</span>
                            {cat.popular && (
                              <span className="text-[9px] font-black bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.2 rounded-full border border-indigo-300 dark:border-indigo-700">
                                პოპულარული
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                            {cat.label}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: LANGUAGE SELECTION */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <span>აირჩიეთ საგამოცდო ენა</span>
                    <span className="text-sm">🇬🇪</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    ტესტირება ხელმისაწვდომია საქართველოს სახელმწიფო და უმცირესობათა ენებზე:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LANGUAGES.map(lang => {
                    const isSelected = selectedLanguage === lang.code;
                    const isGeorgianTerritory = ['Geo', 'Abk', 'Oss'].includes(lang.code);

                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 shadow-[3px_3px_0px_#4f46e5]'
                            : 'bg-white dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 hover:bg-slate-50 shadow-[1px_1px_0px_#cbd5e1]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl shrink-0" role="img" aria-label={lang.label}>
                            {lang.flag}
                          </span>
                          <div>
                            <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{lang.label}</span>
                              {isGeorgianTerritory && (
                                <span className="text-[9px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-300 dark:border-emerald-800">
                                  🇬🇪
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono font-bold">
                              {lang.short}
                            </div>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-400 dark:border-slate-600 bg-transparent'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-note for Abkhazian / Ossetian */}
                {(selectedLanguage === 'Abk' || selectedLanguage === 'Oss') && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      თარგმანი ეფუძნება ოფიციალურ საგამოცდო მასალას. საჭიროების შემთხვევაში ჩაიტვირთება ქართული 🇬🇪 ორიგინალი.
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: EXAM RULES & INSTRUCTIONS */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <span>საგამოცდო წესები და ინსტრუქცია</span>
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-black border border-indigo-300">
                      {activeCategoryObj.name} • {activeLangObj.label}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    გთხოვთ ყურადღებით გაეცნოთ ოფიციალურ პირობებს გამოცდის დაწყებამდე:
                  </p>
                </div>

                {/* Rules List Grid */}
                <div className="space-y-2.5">
                  {rules.map((rule, idx) => {
                    const ruleIcons = [Clock, AlertTriangle, RotateCcw, Award];
                    const RuleIcon = ruleIcons[idx % ruleIcons.length];
                    const iconColors = [
                      'bg-indigo-100 text-indigo-700 border-indigo-300',
                      'bg-rose-100 text-rose-700 border-rose-300',
                      'bg-amber-100 text-amber-700 border-amber-300',
                      'bg-emerald-100 text-emerald-700 border-emerald-300'
                    ];

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-start gap-3 shadow-[1px_1px_0px_#e2e8f0]"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${iconColors[idx]}`}>
                          <RuleIcon className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            {rule.title}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-bold mt-0.5 leading-relaxed">
                            {rule.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Don't show rules again Checkbox / Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-[2px_2px_0px_#cbd5e1] dark:shadow-[2px_2px_0px_#000]">
                    <input
                      type="checkbox"
                      checked={skipRules}
                      onChange={(e) => handleToggleSkipRules(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-2 border-slate-900 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-black text-slate-900 dark:text-white block">
                        აღარ მაჩვენო წესები მომავალში
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                        შემდეგ ჯერზე გამოცდა პირდაპირ დაიწყება მე-3 ნაბიჯის გამოტოვებით
                      </span>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>უკან</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              გაუქმება
            </button>
          )}

          <div className="flex items-center gap-2">
            {step === 1 && (
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="px-5 py-2.5 rounded-xl border-2 border-slate-900 text-white bg-indigo-600 hover:bg-indigo-500 text-xs font-black shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5"
              >
                <span>შემდეგი: ენა</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="px-5 py-2.5 rounded-xl border-2 border-slate-900 text-white bg-indigo-600 hover:bg-indigo-500 text-xs font-black shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5"
              >
                <span>{skipRules ? 'გამოცდის დაწყება 🚀' : 'შემდეგი: წესები'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinalStart}
                className="px-6 py-2.5 rounded-xl border-2 border-slate-900 text-white bg-indigo-600 hover:bg-indigo-500 text-xs font-black shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2"
              >
                <Rocket className="w-4 h-4 fill-current" />
                <span>გამოცდის დაწყება 🚀</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

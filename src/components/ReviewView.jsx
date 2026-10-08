import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ZoomIn, 
  HelpCircle, 
  Check, 
  X, 
  Bookmark, 
  LayoutDashboard
} from 'lucide-react';
import { getT } from '../utils/i18n';

export default function ReviewView({
  questions = [],
  userAnswers = {},
  initialFilter = 'all', // 'all' or 'mistakes'
  onBackToResults,
  onBackToDashboard,
  onInspectImage,
  onRemoveFromMistakes,
  currentLanguage = 'Geo'
}) {
  const t = getT(currentLanguage);
  const [filterMode, setFilterMode] = useState(initialFilter); // 'all' or 'mistakes'
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter questions based on filterMode
  const displayQuestions = questions.filter(q => {
    if (filterMode === 'mistakes') {
      const ans = userAnswers[q.id];
      return ans !== q.rightAnswer;
    }
    return true;
  });

  const activeQuestion = displayQuestions[currentIndex] || displayQuestions[0];

  if (!activeQuestion) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white dark:bg-[#161b22] rounded-4xl border-2 border-slate-900 dark:border-slate-700 p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_#000]">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">შეცდომები არ არის</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6 font-bold">
          არჩეულ ფილტრში ყველა კითხვაზე სწორი პასუხი გაქვთ გაცემული!
        </p>
        <button
          onClick={() => setFilterMode('all')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black border-2 border-slate-900 dark:border-slate-700 mr-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px]"
        >
          ყველა კითხვა
        </button>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#21262d] text-slate-800 dark:text-slate-200 text-xs font-black border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px]"
        >
          {t.backToDashboard}
        </button>
      </div>
    );
  }

  const userSelected = userAnswers[activeQuestion.id];
  const isCorrect = userSelected === activeQuestion.rightAnswer;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Top Review Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-4 sm:px-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToResults || onBackToDashboard}
            className="p-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="უკან დაბრუნება"
          >
            <ArrowLeft className="w-5 h-5 text-slate-900 dark:text-slate-100" />
          </button>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-white bg-indigo-600 px-2.5 py-0.5 rounded-lg border border-slate-900 dark:border-slate-700">
              შედეგების ანალიზი
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 mt-0.5">
              კითხვა <span className="text-indigo-600 dark:text-indigo-400">{currentIndex + 1}</span> {t.of} {displayQuestions.length}
            </h2>
          </div>
        </div>

        {/* Filter Pills: All vs Mistakes */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-[#21262d] p-1 rounded-2xl flex items-center gap-1 border-2 border-slate-900 dark:border-slate-600">
            <button
              onClick={() => {
                setFilterMode('all');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition min-h-[36px] ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-[#161b22] text-slate-900 dark:text-slate-100 shadow-sm border border-slate-900 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              ყველა ({questions.length})
            </button>
            <button
              onClick={() => {
                setFilterMode('mistakes');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition min-h-[36px] ${
                filterMode === 'mistakes'
                  ? 'bg-rose-500 text-white shadow-sm border border-slate-900 dark:border-rose-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              მხოლოდ შეცდომები
            </button>
          </div>

          <button
            onClick={onBackToDashboard}
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-black border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-white dark:bg-[#21262d] min-h-[44px]"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>მთავარი</span>
          </button>
        </div>
      </div>

      {/* Main Review Content Card */}
      <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_#000] space-y-5">
        
        {/* Status Pill on current question */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ბილეთი #{activeQuestion.id} (ID: {activeQuestion.examTicketId || activeQuestion.id})
          </span>

          <div>
            {userSelected === undefined ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-[#21262d] text-slate-700 dark:text-slate-300 border-2 border-slate-900 dark:border-slate-700">
                <HelpCircle className="w-3.5 h-3.5" />
                {t.unanswered}
              </span>
            ) : isCorrect ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-2 border-slate-900 dark:border-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                {t.correct}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-2 border-slate-900 dark:border-rose-600">
                <XCircle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                {t.incorrect}
              </span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
          {activeQuestion.question}
        </h3>

        {/* Illustration image */}
        {activeQuestion.imageId && (
          <div 
            onClick={() => onInspectImage(activeQuestion.imageId, activeQuestion.question)}
            className="relative group cursor-pointer bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-900 dark:border-slate-700 max-h-52 sm:max-h-60 flex items-center justify-center shadow-inner"
          >
            <img
              src={`/images/${activeQuestion.imageId}.jpg`}
              alt="Road situation illustration"
              className="max-h-52 sm:max-h-60 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 border border-white/20">
              <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.imageClickZoom}</span>
            </div>
          </div>
        )}

        {/* Answer Options Review */}
        <div className="space-y-2.5 pt-1">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
            ვარიანტების ანალიზი:
          </div>

          {activeQuestion.answers.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isRight = opt.answerNumbering === activeQuestion.rightAnswer;
            const isUserPick = opt.answerNumbering === userSelected;

            let cardStyle = 'bg-[#F8FAFC] dark:bg-[#21262d] border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 opacity-70';
            let circleStyle = 'bg-white dark:bg-[#161b22] border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400';

            if (isRight) {
              cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold shadow-[3px_3px_0px_0px_rgba(5,150,105,1)] opacity-100';
              circleStyle = 'bg-emerald-600 border-2 border-emerald-700 text-white';
            } else if (isUserPick) {
              cardStyle = 'bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-600 text-rose-950 dark:text-rose-100 font-bold shadow-[3px_3px_0px_0px_rgba(225,29,72,1)] opacity-100';
              circleStyle = 'bg-rose-600 border-2 border-rose-700 text-white';
            }

            return (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-start gap-3.5 min-h-[44px] ${cardStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${circleStyle}`}>
                  {letter}
                </div>

                <div className="flex-1 text-xs sm:text-sm font-bold leading-relaxed pt-0.5">
                  {opt.answer}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isRight && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-600 text-white shadow-sm border border-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      {t.correctAnswer}
                    </span>
                  )}
                  {isUserPick && !isRight && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-600 text-white shadow-sm border border-rose-700">
                      <X className="w-3.5 h-3.5" />
                      {t.yourAnswer}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Reference / Explanation Banner */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-slate-900 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 font-bold flex items-start gap-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000]">
          <HelpCircle className="w-4 h-4 text-indigo-700 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-black block mb-0.5">ოფიციალური კანონმდებლობა</span>
            <span>{t.explanationNote}</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-slate-900 dark:border-slate-700 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-[#21262d] text-slate-400 shadow-none'
                : 'bg-white dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>წინა</span>
          </button>

          {/* Quick Question Picker Dots */}
          <div className="hidden md:flex items-center gap-1 max-w-sm overflow-x-auto py-1">
            {displayQuestions.map((q, idx) => {
              const qAns = userAnswers[q.id];
              const qRight = qAns === q.rightAnswer;
              const isCur = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-black flex items-center justify-center transition border ${
                    isCur
                      ? 'border-2 border-slate-900 dark:border-white scale-110 shadow-sm ring-2 ring-indigo-500'
                      : 'border-slate-300 dark:border-slate-600'
                  } ${
                    qAns === undefined
                      ? 'bg-slate-100 dark:bg-[#21262d] text-slate-600 dark:text-slate-400'
                      : qRight
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(displayQuestions.length - 1, prev + 1))}
            disabled={currentIndex === displayQuestions.length - 1}
            className={`px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-slate-900 dark:border-slate-700 transition shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] ${
              currentIndex === displayQuestions.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-[#21262d] text-slate-400 shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <span>შემდეგი</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

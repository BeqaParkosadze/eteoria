import React, { useState } from 'react';
import { 
  Bookmark, 
  Play, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  Search, 
  ZoomIn, 
  AlertCircle, 
  BookOpen,
  X
} from 'lucide-react';
import { getT } from '../utils/i18n';
import { getTicketImageUrl } from '../utils/ticketService';

export default function MistakesView({
  mistakes = [],
  currentCategory = 'B_B1',
  currentLanguage = 'Geo',
  onStartPractice,
  onClearMistakes,
  onRemoveMistake,
  onBackToDashboard,
  onStartExam,
  onNavigateToStudy,
  onInspectImage
}) {
  const t = getT(currentLanguage);
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize mistake items and safely filter
  const safeMistakes = Array.isArray(mistakes) ? mistakes : [];

  const filteredMistakes = safeMistakes.filter((q, idx) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const qText = (q.question || q.text || '').toLowerCase();
    const numMatch = String(q.examTicketId || q.id || idx + 1).includes(query);
    const answers = Array.isArray(q.answers) ? q.answers : [];
    const answerMatch = answers.some(a => {
      const aText = typeof a === 'object' ? (a.answer || a.text || '') : String(a || '');
      return aText.toLowerCase().includes(query);
    });
    return qText.includes(query) || numMatch || answerMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in w-full">
      
      {/* 1. TOP HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 min-h-[44px]"
            title="მთავარზე დაბრუნება"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">მთავარი</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>{t.practiceMistakes || 'შეცდომების ბანკი'}</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                {safeMistakes.length}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-0.5">
              გამოცდების დროს დაშვებული შეცდომების არქივი • ივარჯიშეთ სრულ ათვისებამდე
            </p>
          </div>
        </div>

        {/* Action Controls (if mistakes exist) */}
        {safeMistakes.length > 0 && (
          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <button
              onClick={onClearMistakes}
              className="px-3.5 py-2 rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 min-h-[44px]"
            >
              <Trash2 className="w-4 h-4" />
              <span>ბანკის გასუფთავება</span>
            </button>

            <button
              onClick={onStartPractice}
              className="px-5 py-2 rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>შეცდომების გავლა ({safeMistakes.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. MAIN CONTENT BODY */}
      {safeMistakes.length === 0 ? (
        
        /* EMPTY STATE: FRIENDLY NEO-BRUTALIST CARD */
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 text-center space-y-4 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000]">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 border-2 border-slate-900 dark:border-slate-600 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000]">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
              ჯერჯერობით შეცდომები არ გაქვთ!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
              თქვენი შეცდომების ბანკი ცარიელია. ყველა პასუხი სწორია, ან ჯერ არ დაგიწყიათ ტესტირება. გაიარეთ საგამოცდო სიმულაცია ცოდნის შესამოწმებლად.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartExam}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>გამოცდის დაწყება</span>
            </button>

            <button
              onClick={onNavigateToStudy}
              className="px-5 py-2.5 rounded-2xl bg-white dark:bg-[#161b22] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-xs border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>ყველა ბილეთი (სწავლა)</span>
            </button>
          </div>
        </div>

      ) : (

        /* MISTAKES EXIST: BANNER & QUESTION LIST */
        <div className="space-y-6">
          
          {/* Quick Info & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 border border-rose-600">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-xs">
                <span className="font-black block text-rose-950 dark:text-rose-200">
                  {safeMistakes.length} შეცდომით გაცემული კითხვა
                </span>
                <span className="text-rose-800 dark:text-rose-300 font-bold">
                  გადახედეთ სწორ პასუხებს ქვემოთ ან გაიარეთ შეცდომების სავარჯიშო სესია.
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="მოძებნეთ შეცდომებში..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-slate-900 dark:border-slate-600 bg-white dark:bg-[#161b22] text-xs font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none min-h-[40px]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List of Mistake Cards */}
          <div className="space-y-4">
            {filteredMistakes.map((question, idx) => {
              const imageId = question.imageId || question.image;
              const imageSrc = imageId ? getTicketImageUrl(imageId) : null;
              const answers = Array.isArray(question.answers) ? question.answers : [];
              const qText = question.question || question.text || `კითხვა #${question.id || idx + 1}`;
              const qNumber = question.examTicketId || question.id || idx + 1;

              return (
                <div
                  key={question.id || idx}
                  className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-4 transition-colors"
                >
                  
                  {/* Card Header: Question info & Remove Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black">
                        #{qNumber}
                      </span>
                      {question.category && (
                        <span className="px-2.5 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 text-[11px] font-black">
                          {question.category}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveMistake(question.id)}
                      className="px-2.5 py-1 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-[#161b22] text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 text-[11px] font-black transition flex items-center gap-1 min-h-[36px]"
                      title="ბანკიდან წაშლა"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>ამოშლა</span>
                    </button>
                  </div>

                  {/* Question Text */}
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 leading-snug">
                    {qText}
                  </h4>

                  {/* Image (if any) */}
                  {imageSrc && (
                    <div className="relative inline-block max-w-sm rounded-2xl overflow-hidden border-2 border-slate-900 dark:border-slate-700 bg-black/5">
                      <img
                        src={imageSrc}
                        alt="საგამოცდო ილუსტრაცია"
                        className="max-h-48 w-auto object-contain cursor-zoom-in hover:opacity-95 transition"
                        onClick={() => onInspectImage && onInspectImage(imageId, qText)}
                        loading="lazy"
                      />
                      <button
                        onClick={() => onInspectImage && onInspectImage(imageId, qText)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black text-[10px] font-bold flex items-center gap-1"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>გადიდება</span>
                      </button>
                    </div>
                  )}

                  {/* Answer Choices (Showing correct answer clearly) */}
                  <div className="space-y-2 pt-1">
                    {answers.map((ans, aIdx) => {
                      const ansText = typeof ans === 'object' ? (ans.answer || ans.text || '') : String(ans || '');
                      const ansNum = typeof ans === 'object' && ans.answerNumbering !== undefined ? Number(ans.answerNumbering) : aIdx + 1;
                      
                      const isCorrect = (question.rightAnswer !== undefined && ansNum === Number(question.rightAnswer)) ||
                                        (question.correct_answer !== undefined && aIdx === question.correct_answer) ||
                                        (typeof ans === 'object' && ans.is_correct === true);

                      const wasUserWrongAnswer = question.userSelectedAnswer !== undefined && question.userSelectedAnswer !== null &&
                                                (Number(question.userSelectedAnswer) === ansNum || Number(question.userSelectedAnswer) === aIdx);

                      return (
                        <div
                          key={aIdx}
                          className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-start gap-3 transition-colors ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                              : wasUserWrongAnswer
                              ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200'
                              : 'bg-white dark:bg-[#161b22] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-black border ${
                            isCorrect
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : wasUserWrongAnswer
                              ? 'bg-rose-500 text-white border-rose-600'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                          }`}>
                            {isCorrect ? '✓' : wasUserWrongAnswer ? '✕' : ansNum}
                          </div>

                          <div className="flex-1">
                            <span>{ansText}</span>
                            {isCorrect && (
                              <span className="ml-2 font-black text-emerald-700 dark:text-emerald-400 text-[10px] uppercase tracking-wide">
                                • სწორი პასუხი
                              </span>
                            )}
                            {wasUserWrongAnswer && (
                              <span className="ml-2 font-black text-rose-700 dark:text-rose-400 text-[10px] uppercase tracking-wide">
                                • თქვენი არჩევანი
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}

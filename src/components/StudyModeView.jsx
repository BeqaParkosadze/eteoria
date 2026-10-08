import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  ZoomIn, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle, 
  RotateCcw, 
  Search, 
  Filter,
  Grid,
  Sparkles,
  Play
} from 'lucide-react';
import { getT } from '../utils/i18n';

export default function StudyModeView({
  questions = [],
  category = 'B_B1',
  language = 'Geo',
  onInspectImage,
  onStartExam,
  onSaveToMistakes,
  onBackToDashboard
}) {
  const t = getT(language);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersState, setAnswersState] = useState({}); // { [questionId]: selectedAnswerNumbering }
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());
  const [jumpInput, setJumpInput] = useState('');
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'IMAGE' | 'MISTAKES'
  const [showGridDrawer, setShowGridDrawer] = useState(false);

  // Filter questions based on filterMode
  const filteredQuestions = useMemo(() => {
    if (filterMode === 'IMAGE') {
      return questions.filter(q => q.imageId !== null);
    }
    if (filterMode === 'MISTAKES') {
      return questions.filter(q => {
        const userAns = answersState[q.id];
        return userAns !== undefined && userAns !== q.rightAnswer;
      });
    }
    return questions;
  }, [questions, filterMode, answersState]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Handle jump
  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= filteredQuestions.length) {
      setCurrentIndex(num - 1);
      setJumpInput('');
    }
  };

  // Keyboard navigation for Study Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (currentQ && currentQ.answers[optIdx]) {
          handleSelectOption(currentQ.answers[optIdx].answerNumbering);
        }
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentIndex < filteredQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredQuestions.length, currentQ]);

  const handleSelectOption = (optNumber) => {
    if (!currentQ) return;
    setAnswersState(prev => ({
      ...prev,
      [currentQ.id]: optNumber
    }));

    // If answer is incorrect, save to mistakes bank
    if (optNumber !== currentQ.rightAnswer && onSaveToMistakes) {
      onSaveToMistakes(currentQ);
    }
  };

  const handleToggleBookmark = () => {
    if (!currentQ) return;
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
        if (onSaveToMistakes) onSaveToMistakes(currentQ);
      }
      return next;
    });
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        ბილეთები იტვირთება...
      </div>
    );
  }

  const selectedAnswer = currentQ ? answersState[currentQ.id] : undefined;
  const isAnswered = selectedAnswer !== undefined;
  const isBookmarked = currentQ && bookmarkedSet.has(currentQ.id);

  return (
    <div className="space-y-5 animate-fade-in max-w-4xl mx-auto">
      
      {/* 1. TOP HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_#000]">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="მთავარზე დაბრუნება"
          >
            <ArrowLeft className="w-4 h-4 text-slate-900 dark:text-slate-100" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-indigo-600 px-2 py-0.5 rounded-lg border border-slate-900 dark:border-slate-700">
                {category}
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                ყველა ბილეთი (სწავლა)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
              კითხვა {currentIndex + 1} / {filteredQuestions.length} ({questions.length} სულ ბილეთი)
            </div>
          </div>
        </div>

        {/* Jump Input & Filters */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Jump to question form */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <input
              type="number"
              min="1"
              max={filteredQuestions.length}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder="№"
              className="w-16 px-2.5 py-1.5 text-xs font-bold border-2 border-slate-900 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-[#21262d] text-slate-900 dark:text-slate-100 min-h-[40px]"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] text-slate-900 dark:text-slate-100 font-black text-xs hover:bg-slate-100 dark:hover:bg-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[40px]"
            >
              გადასვლა
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-100 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-600 p-0.5 rounded-xl">
            <button
              onClick={() => { setFilterMode('ALL'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition min-h-[36px] ${
                filterMode === 'ALL' ? 'bg-white dark:bg-[#161b22] text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              ყველა
            </button>
            <button
              onClick={() => { setFilterMode('IMAGE'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition min-h-[36px] ${
                filterMode === 'IMAGE' ? 'bg-white dark:bg-[#161b22] text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              სურათით
            </button>
          </div>

          {/* Start Real Exam Shortcut */}
          <button
            onClick={() => onStartExam('exam')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1 min-h-[40px]"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden md:inline">გამოცდის დაწყება</span>
          </button>
        </div>

      </div>

      {/* 2. MAIN STUDY CARD (Interactive with Immediate Feedback) */}
      {currentQ && (
        <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl sm:rounded-4xl p-3.5 sm:p-7 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_#000] sm:dark:shadow-[5px_5px_0px_0px_#000] space-y-4 sm:space-y-5 overflow-hidden w-full max-w-full">
          
          {/* Card Top: Number, Bookmark toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-[#21262d] px-2 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                ბილეთი #{currentQ.id}
              </span>
              {currentQ.examTicketId && (
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  (ID: {currentQ.examTicketId})
                </span>
              )}
            </div>

            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border-2 border-slate-900 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 transition shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-white dark:bg-[#21262d] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-900' : ''}`} />
              <span>{isBookmarked ? 'შენახულია' : 'შენახვა'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h2 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug font-['Plus_Jakarta_Sans',sans-serif] break-words">
            {currentQ.question}
          </h2>

          {/* Question Image (if exists) */}
          {currentQ.imageId && (
            <div 
              onClick={() => onInspectImage(currentQ.imageId, currentQ.question)}
              className="relative group cursor-pointer bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-900 dark:border-slate-700 max-h-48 sm:max-h-60 flex items-center justify-center my-2 shadow-inner"
            >
              <img
                src={`/images/${currentQ.imageId}.jpg`}
                alt="საგზაო სიტუაციის ილუსტრაცია"
                className="max-h-48 sm:max-h-60 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-black/80 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>გადიდება</span>
              </div>
            </div>
          )}

          {/* Answer Cards with Instant Verification Feedback */}
          <div className="space-y-2 pt-1 sm:pt-2">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
              აირჩიეთ სწორი პასუხი (მომენტალური შემოწმება):
            </div>

            {currentQ.answers.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedAnswer === opt.answerNumbering;
              const isRight = opt.answerNumbering === currentQ.rightAnswer;

              let cardStyle = 'bg-[#F8FAFC] dark:bg-[#21262d] border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 hover:bg-white dark:hover:bg-[#282e37] text-slate-800 dark:text-slate-200 shadow-[2px_2px_0px_0px_rgba(226,232,240,1)] dark:shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]';
              let circleStyle = 'bg-white dark:bg-[#161b22] border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300';
              let badge = null;

              if (isAnswered) {
                if (isSelected && isRight) {
                  // User chose correct answer!
                  cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-[2px_2px_0px_#10b981] transition-colors duration-200';
                  circleStyle = 'bg-emerald-600 border-2 border-emerald-700 text-white';
                  badge = (
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      <span className="hidden sm:inline">სწორია!</span>
                      <span className="sm:hidden">სწორი</span>
                    </span>
                  );
                } else if (isSelected && !isRight) {
                  // User chose incorrect answer
                  cardStyle = 'bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-900 dark:text-rose-100 font-bold shadow-[2px_2px_0px_#f43f5e] transition-colors duration-200';
                  circleStyle = 'bg-rose-500 border-2 border-rose-700 text-white';
                  badge = (
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      <span>მცდარია</span>
                    </span>
                  );
                } else if (isRight) {
                  // Reveal correct answer when user was wrong
                  cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-[2px_2px_0px_#10b981] transition-colors duration-200';
                  circleStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white';
                  badge = (
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                      <span className="hidden sm:inline">სწორი პასუხი</span>
                      <span className="sm:hidden">სწორი</span>
                    </span>
                  );
                } else {
                  cardStyle = 'bg-slate-50 dark:bg-[#161b22]/40 border-2 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-40';
                  circleStyle = 'bg-slate-100 dark:bg-[#21262d] border-2 border-slate-300 dark:border-slate-700 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.answerNumbering)}
                  className={`w-full text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-150 flex items-start sm:items-center justify-between gap-2 sm:gap-3 min-h-[44px] ${
                    isAnswered ? 'cursor-default' : 'active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                  } ${cardStyle}`}
                >
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 sm:mt-0 ${circleStyle}`}>
                      {letter}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed break-words">
                      {opt.answer}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mt-0.5 sm:mt-0">
                    {badge}
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hidden sm:inline">
                      {idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Card Controls: Responsive Previous, Reset, Next */}
          <div className="pt-3 sm:pt-4 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 min-w-0">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex-1 sm:flex-none min-w-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 border-2 border-slate-900 dark:border-slate-700 transition shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px] ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-[#21262d] text-slate-400 shadow-none'
                  : 'bg-white dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">წინა</span>
              <span className="hidden sm:inline">ბილეთი</span>
            </button>

            {isAnswered && (
              <button
                onClick={() => {
                  setAnswersState(prev => {
                    const next = { ...prev };
                    delete next[currentQ.id];
                    return next;
                  });
                }}
                className="shrink-0 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px]"
                title="ხელახლა არჩევა"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0 text-slate-600 dark:text-slate-400" />
                <span className="text-[11px] sm:text-xs">ხელახლა</span>
              </button>
            )}

            <button
              onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
              disabled={currentIndex === filteredQuestions.length - 1}
              className={`flex-1 sm:flex-none min-w-0 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition min-h-[44px] ${
                currentIndex === filteredQuestions.length - 1 ? 'opacity-40 cursor-not-allowed shadow-none' : ''
              }`}
            >
              <span className="truncate">შემდეგი</span>
              <span className="hidden sm:inline">ბილეთი</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

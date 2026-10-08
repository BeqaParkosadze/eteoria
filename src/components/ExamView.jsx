import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  Settings,
  HelpCircle,
  Volume2,
  ChevronDown
} from 'lucide-react';
import { getT } from '../utils/i18n';
import { EXAM_CONFIG } from '../utils/constants';

export default function ExamView({
  questions = [],
  category = 'B_B1',
  language = 'Geo',
  examMode = 'exam', // 'exam' or 'mistakes'
  maxAllowedMistakes = 3,
  onFinishExam,
  onCancelExam,
  onInspectImage
}) {
  const t = getT(language);

  // Initialize original questions with their fixed index 0..29
  const [originalQuestions] = useState(() => 
    questions.map((q, idx) => ({ ...q, originalIndex: idx }))
  );

  // Active queue of questions remaining to be answered
  const [questionQueue, setQuestionQueue] = useState(() => 
    questions.map((q, idx) => ({ ...q, originalIndex: idx }))
  );

  // Map of answered questions: { [questionId]: { selectedAnswer: number, isCorrect: boolean } }
  const [answeredMap, setAnsweredMap] = useState({});

  // Set of question IDs postponed to the end
  const [postponedIds, setPostponedIds] = useState(new Set());

  // Auto-advance toggle state (3-second delay)
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [countdownRemaining, setCountdownRemaining] = useState(null); // in ms or null
  const autoAdvanceTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Exam timer & exit modals
  const [timeLeft, setTimeLeft] = useState(EXAM_CONFIG.TIME_LIMIT_SECONDS); // 1800s
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [examStartTime] = useState(Date.now());

  // Current active question at the front of queue
  const currentQuestion = questionQueue[0] || originalQuestions[0];
  const currentStatus = currentQuestion ? answeredMap[currentQuestion.id] : null;
  const isCurrentLocked = !!currentStatus;

  // Mistakes count
  const mistakesCount = Object.values(answeredMap).filter(a => !a.isCorrect).length;
  const isFailThresholdReached = mistakesCount > maxAllowedMistakes;
  const totalAnswered = Object.keys(answeredMap).length;

  // Clear any active auto-advance timers
  const clearAutoAdvanceTimers = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownRemaining(null);
  }, []);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [answeredMap, questionQueue]);

  // Finish exam handler
  const finishTest = useCallback((forcedByTimeout = false) => {
    clearAutoAdvanceTimers();
    const durationSeconds = Math.round((Date.now() - examStartTime) / 1000);

    let score = 0;
    const finalMistakes = [];
    const answersObj = {};

    originalQuestions.forEach(q => {
      const record = answeredMap[q.id];
      if (record) {
        answersObj[q.id] = record.selectedAnswer;
        if (record.isCorrect) {
          score += 1;
        } else {
          finalMistakes.push({
            ...q,
            userSelectedAnswer: record.selectedAnswer,
          });
        }
      } else {
        // Unanswered
        finalMistakes.push({
          ...q,
          userSelectedAnswer: null,
        });
      }
    });

    const passed = score >= (originalQuestions.length - maxAllowedMistakes) && 
                   finalMistakes.length <= maxAllowedMistakes;

    onFinishExam({
      id: 'exam_' + Date.now(),
      date: Date.now(),
      category,
      language,
      totalQuestions: originalQuestions.length,
      score,
      mistakesCount: finalMistakes.length,
      maxAllowedMistakes,
      passed,
      durationSeconds,
      answers: answersObj,
      mistakeQuestions: finalMistakes,
      questions: originalQuestions,
      forcedByTimeout,
    });
  }, [originalQuestions, answeredMap, examStartTime, category, language, maxAllowedMistakes, onFinishExam, clearAutoAdvanceTimers]);

  // Advance to next question in queue
  const handleNextQuestion = useCallback(() => {
    clearAutoAdvanceTimers();

    if (questionQueue.length > 1) {
      // Remove current answered question from queue
      setQuestionQueue(prev => prev.slice(1));
    } else {
      // Last question answered! Finish test
      finishTest(false);
    }
  }, [questionQueue.length, finishTest, clearAutoAdvanceTimers]);

  // Postpone question to the end ("ბოლოში მოტოვება")
  const handlePostponeToEnd = () => {
    if (!currentQuestion || isCurrentLocked) return;
    clearAutoAdvanceTimers();

    // Mark as postponed
    setPostponedIds(prev => new Set(prev).add(currentQuestion.id));

    // Move current question to the end of queue
    setQuestionQueue(prev => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
  };

  // Select and lock answer
  const handleSelectAnswer = (answerNumbering) => {
    if (!currentQuestion || isCurrentLocked) return;

    const isCorrect = answerNumbering === currentQuestion.rightAnswer;

    // Lock answer immediately
    setAnsweredMap(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedAnswer: answerNumbering,
        isCorrect,
      }
    }));

    // Remove from postponed set once answered
    setPostponedIds(prev => {
      const next = new Set(prev);
      next.delete(currentQuestion.id);
      return next;
    });

    // Auto-advance logic (3-second visual countdown)
    if (autoAdvance) {
      const durationMs = 3000;
      const startTime = Date.now();
      setCountdownRemaining(3000);

      countdownIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remain = Math.max(0, durationMs - elapsed);
        setCountdownRemaining(remain);
        if (remain <= 0) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      }, 100);

      autoAdvanceTimerRef.current = setTimeout(() => {
        handleNextQuestion();
      }, durationMs);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showExitConfirm || e.target.tagName === 'INPUT') return;

      // Keys 1, 2, 3, 4 to select
      if (['1', '2', '3', '4'].includes(e.key) && !isCurrentLocked) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (currentQuestion && currentQuestion.answers[optIdx]) {
          handleSelectAnswer(currentQuestion.answers[optIdx].answerNumbering);
        }
      }

      // Space or Enter -> Next Question if locked
      if ((e.key === ' ' || e.key === 'Enter') && isCurrentLocked) {
        e.preventDefault();
        handleNextQuestion();
      }

      // 'p' or 'P' -> Postpone to end
      if ((e.key === 'p' || e.key === 'P') && !isCurrentLocked) {
        e.preventDefault();
        handlePostponeToEnd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isCurrentLocked, showExitConfirm, handleNextQuestion]);

  // Formatted timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = timeLeft < 300;

  if (!currentQuestion) {
    return <div className="p-8 text-center text-slate-500 font-bold">იტვირთება...</div>;
  }

  return (
    <div className="h-full flex flex-col justify-between select-none overflow-hidden gap-2 animate-fade-in">
      
      {/* ========================================================
          1. DEDICATED FULLSCREEN EXAM TOP BAR
             (Replaces Global Navbar during Exam Mode)
         ======================================================== */}
      <div className="flex items-center justify-between bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-2xl px-3 py-2 sm:px-4 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] shrink-0">
        
        {/* Left: Tactile Exit Button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-xs shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition min-h-[38px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">მთავარზე გასვლა</span>
          <span className="sm:hidden">გასვლა</span>
        </button>

        {/* Center: Category Badge, Live Timer & Mistakes Counter */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs font-black uppercase text-white bg-indigo-600 px-2.5 py-0.5 rounded-lg border-2 border-slate-900 dark:border-slate-700 shadow-[1px_1px_0px_#0f172a]">
            {category}
          </span>

          {/* Live Timer */}
          <div className={`px-2.5 py-1 rounded-xl border-2 border-slate-900 dark:border-slate-700 flex items-center gap-1.5 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] ${
            isTimeCritical ? 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 animate-pulse' : 'bg-slate-50 dark:bg-[#21262d] text-slate-900 dark:text-slate-100'
          }`}>
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-mono font-black text-xs sm:text-sm tracking-tight">{formattedTime}</span>
          </div>

          {/* Live Mistakes Counter */}
          <div className={`px-2.5 py-1 rounded-xl border-2 border-slate-900 dark:border-slate-700 flex items-center gap-1.5 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] ${
            isFailThresholdReached ? 'bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200' : 'bg-slate-50 dark:bg-[#21262d] text-slate-900 dark:text-slate-100'
          }`}>
            <AlertTriangle className={`w-3.5 h-3.5 ${isFailThresholdReached ? 'text-rose-600 dark:text-rose-400' : 'text-amber-500'}`} />
            <span className="text-[11px] sm:text-xs font-black">
              შეცდომა: <span className={mistakesCount > 0 ? (isFailThresholdReached ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400') : 'text-slate-900 dark:text-slate-100'}>{mistakesCount}</span> / {maxAllowedMistakes}
            </span>
          </div>
        </div>

        {/* Right: Question Number & Settings Trigger */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#21262d] px-2.5 py-1 rounded-xl border-2 border-slate-900 dark:border-slate-700">
            {totalAnswered} / {originalQuestions.length} პასუხი
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="p-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition flex items-center gap-1 text-xs font-black min-h-[38px]"
              title="დამატებითი პარამეტრები"
            >
              <Settings className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showSettingsDrawer && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSettingsDrawer(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-2xl shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] p-3 z-50 text-xs font-bold space-y-2.5 animate-fade-in text-slate-900 dark:text-slate-100">
                  <div className="text-[10px] uppercase font-black text-slate-400 tracking-wider pb-1 border-b border-slate-200 dark:border-slate-700">
                    გამოცდის პარამეტრები
                  </div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>ავტომატური გადასვლა</span>
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-slate-900 dark:border-slate-700 text-indigo-600"
                    />
                  </label>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    კლავიშები: [1-4] პასუხი • [P] ბოლოში მოტოვება • [Space] შემდეგი
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================
          2. COMPACT 30-QUESTION HORIZONTAL STRIP
             (Manual clicking disabled to mirror official rules)
         ======================================================== */}
      <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-2xl px-2.5 py-1.5 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] shrink-0 overflow-x-auto">
        <div className="flex items-center justify-between gap-1 min-w-[560px]">
          {originalQuestions.map((q, idx) => {
            const isCurrent = currentQuestion && currentQuestion.originalIndex === idx;
            const record = answeredMap[q.id];
            const isPostponed = postponedIds.has(q.id);

            let pillStyle = 'bg-slate-100 dark:bg-[#21262d] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600';
            
            if (record) {
              if (record.isCorrect) {
                pillStyle = 'bg-emerald-500 text-white border-slate-900 dark:border-emerald-600 font-black';
              } else {
                pillStyle = 'bg-rose-500 text-white border-slate-900 dark:border-rose-600 font-black';
              }
            } else if (isPostponed) {
              pillStyle = 'bg-amber-300 dark:bg-amber-500 text-slate-950 border-slate-900 font-black';
            }

            if (isCurrent) {
              pillStyle += ' ring-2 ring-indigo-600 border-2 border-slate-900 dark:border-white scale-110 shadow-sm z-10';
            }

            return (
              <div
                key={q.id}
                title={`კითხვა #${idx + 1}`}
                className={`flex-1 h-6 sm:h-7 rounded-lg border text-[10px] sm:text-[11px] font-black flex items-center justify-center transition-all cursor-default select-none ${pillStyle}`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          3. MAIN QUESTION & ANSWERS CARD
             (Strict Vertical Flex Layout with Zero Collisions)
         ======================================================== */}
      <div className="flex-1 min-h-0 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-3 sm:p-4 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] flex flex-col justify-between overflow-hidden">
        
        {/* Top: Question text + Ticket ID */}
        <div className="shrink-0 flex items-start justify-between gap-2 pb-1">
          <h2 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-slate-100 leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
            {currentQuestion.question}
          </h2>
          <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-[#21262d] dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 shrink-0">
            #{currentQuestion.examTicketId || currentQuestion.id}
          </span>
        </div>

        {/* Center 1: Illustration (Strictly constrained height) */}
        {currentQuestion.imageId && (
          <div 
            onClick={() => onInspectImage(currentQuestion.imageId, currentQuestion.question)}
            className="shrink-0 h-28 sm:h-32 md:h-36 max-h-36 bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center relative group cursor-pointer my-1 shadow-inner w-full"
          >
            <img
              src={`/images/${currentQuestion.imageId}.jpg`}
              alt="საგზაო სიტუაცია"
              className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute bottom-1.5 right-1.5 bg-black/80 hover:bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 border border-white/20">
              <ZoomIn className="w-3 h-3 text-indigo-400" />
              <span>გადიდება</span>
            </div>
          </div>
        )}

        {/* Center 2: Answer Options Container
            (flex-1 with overflow-y-auto so answers never collide with footer!) */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 sm:space-y-2 py-1 pr-0.5">
          {currentQuestion.answers.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = currentStatus?.selectedAnswer === opt.answerNumbering;
            const isCorrectOpt = opt.answerNumbering === currentQuestion.rightAnswer;

            let cardStyle = 'bg-[#F8FAFC] dark:bg-[#21262d] border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 hover:bg-white dark:hover:bg-[#282e37] text-slate-800 dark:text-slate-200 shadow-[1px_1px_0px_#cbd5e1] dark:shadow-[1px_1px_0px_#000]';
            let circleStyle = 'bg-white dark:bg-[#161b22] border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300';
            let badge = null;

            if (isCurrentLocked) {
              if (isSelected && isCorrectOpt) {
                // User chose correct answer! Smooth transition without scale
                cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-[2px_2px_0px_#10b981] transition-colors duration-200';
                circleStyle = 'bg-emerald-600 border-2 border-emerald-700 text-white';
                badge = (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>სწორია!</span>
                  </span>
                );
              } else if (isSelected && !isCorrectOpt) {
                // User chose incorrect answer: crisp shake animation with soft rose
                cardStyle = 'bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-900 dark:text-rose-100 font-bold shadow-[2px_2px_0px_#f43f5e] animate-shake';
                circleStyle = 'bg-rose-500 border-2 border-rose-700 text-white';
                badge = (
                  <span className="flex items-center gap-1 text-[10px] font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700 px-2 py-0.5 rounded-full shrink-0">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                    <span>მცდარია</span>
                  </span>
                );
              } else if (isCorrectOpt) {
                // Reveal correct answer when user was wrong: smooth transition without scale
                cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-[2px_2px_0px_#10b981] transition-colors duration-200';
                circleStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white';
                badge = (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>სწორი პასუხი</span>
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
                disabled={isCurrentLocked}
                onClick={() => handleSelectAnswer(opt.answerNumbering)}
                className={`w-full text-left p-2 sm:p-2.5 rounded-xl transition-all duration-150 flex items-center justify-between gap-2.5 min-h-[44px] ${cardStyle} ${
                  isCurrentLocked ? 'cursor-default' : 'active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${circleStyle}`}>
                    {letter}
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-snug">
                    {opt.answer}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {badge}
                  {!isCurrentLocked && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hidden sm:inline">
                      {idx + 1}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Bar: Firmly pinned to bottom with clean separation */}
        <div className="shrink-0 pt-2 mt-auto border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5 bg-white dark:bg-[#161b22]">
          
          {/* Left: Custom Styled Auto-Advance Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-slate-900 dark:border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span className="text-[10px] sm:text-xs font-black text-slate-700 dark:text-slate-300">
              ავტომატური გადასვლა (3 წმ)
            </span>
          </label>

          {/* Right: "ბოლოში მოტოვება" or "შემდეგი" */}
          <div className="flex items-center gap-2">
            
            {!isCurrentLocked ? (
              <button
                onClick={handlePostponeToEnd}
                title="კითხვის ბოლოში მოტოვება"
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-xs flex items-center gap-1.5 border-2 border-slate-900 dark:border-amber-700 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 text-slate-900 dark:text-amber-200 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ბოლოში მოტოვება</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl font-black text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition relative overflow-hidden min-h-[44px]"
              >
                {/* 3s Visual Progress Countdown Bar */}
                {countdownRemaining !== null && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-white/60 transition-all duration-100"
                    style={{ width: `${(countdownRemaining / 3000) * 100}%` }}
                  />
                )}
                <span>{questionQueue.length === 1 ? 'დასრულება' : 'შემდეგი'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

        </div>

      </div>

      {/* QUICK EXIT CONFIRM MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowExitConfirm(false)} />
          
          <div className="relative z-10 max-w-sm w-full bg-white dark:bg-[#161b22] rounded-3xl p-5 shadow-2xl border-2 border-slate-900 dark:border-slate-700 space-y-4 text-slate-900 dark:text-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-amber-300 mx-auto shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000]">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="text-center">
              <h4 className="text-base font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                ნამდვილად გსურთ გამოცდის შეწყვეტა?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-bold">
                პროგრესი არ შეინახება. დაბრუნდებით მთავარ გვერდზე.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="py-2.5 px-3 rounded-xl border-2 border-slate-900 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px]"
              >
                გაგრძელება
              </button>
              <button
                onClick={onCancelExam}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 font-black text-xs text-white border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[44px]"
              >
                შეწყვეტა
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

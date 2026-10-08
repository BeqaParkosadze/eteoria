import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExamView from './components/ExamView';
import ResultsView from './components/ResultsView';
import ReviewView from './components/ReviewView';
import StudyModeView from './components/StudyModeView';
import ImageZoomModal from './components/ImageZoomModal';
import SearchModal from './components/SearchModal';
import ExamWizardModal from './components/ExamWizardModal';
import MistakesView from './components/MistakesView';
import ArticlesView from './components/ArticlesView';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import RulesModal from './components/RulesModal';
import FeedbackModal from './components/FeedbackModal';
import { 
  getExamHistory, 
  saveExamAttempt, 
  clearExamHistory,
  getMistakesBank, 
  saveMistakesToBank,
  removeMistakeFromBank,
  clearMistakesBank,
  getStoredSettings,
  saveStoredSettings
} from './utils/storage';
import { fetchTickets, generateExamQuestions } from './utils/ticketService';
import { EXAM_CONFIG } from './utils/constants';
import { Loader2, AlertCircle, Info, X, LayoutDashboard, BookOpen, Bookmark, Search } from 'lucide-react';

export default function App() {
  // Settings & Navigation State
  const initialSettings = getStoredSettings();
  const [currentCategory, setCurrentCategory] = useState(initialSettings.category || 'B_B1');
  const [currentLanguage, setCurrentLanguage] = useState(initialSettings.language || 'Geo');
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'study' | 'exam' | 'results' | 'review' | 'mistakes' | 'articles'
  const [activeArticleSlug, setActiveArticleSlug] = useState(null);
  const [examMistakesLimit, setExamMistakesLimit] = useState(3); // 3 (Official) or 5 (Practice)

  // Data State
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Storage State
  const [examHistory, setExamHistory] = useState([]);
  const [mistakesBank, setMistakesBank] = useState([]);

  // Active Exam Session State
  const [examQuestions, setExamQuestions] = useState([]);
  const [examMode, setExamMode] = useState('exam'); // 'exam' | 'mistakes'
  const [currentResult, setCurrentResult] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'mistakes'

  // Modals State
  const [zoomImage, setZoomImage] = useState(null); // { imageId, questionText }
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExamWizardOpen, setIsExamWizardOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Theme State (Dark / Light) - Guaranteed working
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eteoria_theme') || localStorage.getItem('teoria_theme') || localStorage.getItem('drivepass_theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Sync theme to document.documentElement (.dark class toggle)
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('eteoria_theme', isDark ? 'dark' : 'light');
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Initialize storage
  useEffect(() => {
    setExamHistory(getExamHistory());
    setMistakesBank(getMistakesBank());
  }, []);

  // Synchronize route with browser URL for SEO articles
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/statiiebi')) {
        const parts = path.split('/').filter(Boolean);
        setActiveView('articles');
        setActiveArticleSlug(parts.length > 1 ? parts[1] : null);
      } else if (path === '/' || path === '') {
        if (activeView === 'articles') {
          setActiveView('dashboard');
          setActiveArticleSlug(null);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleNavigateToArticles = (slug = null) => {
    setActiveView('articles');
    setActiveArticleSlug(slug);
    const targetUrl = slug ? `/statiiebi/${slug}` : '/statiiebi';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticlesCatalog = () => {
    setActiveArticleSlug(null);
    if (window.location.pathname !== '/statiiebi') {
      window.history.pushState(null, '', '/statiiebi');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboardFromArticles = () => {
    setActiveView('dashboard');
    setActiveArticleSlug(null);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view) => {
    setActiveView(view);
    setActiveArticleSlug(null);
    if (view === 'dashboard' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  // Save settings when changed
  useEffect(() => {
    saveStoredSettings({ category: currentCategory, language: currentLanguage });
  }, [currentCategory, currentLanguage]);

  // Load tickets whenever category or language changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingTickets(true);
    setLoadError(null);

    fetchTickets(currentCategory, currentLanguage)
      .then(questions => {
        if (isMounted) {
          setAllQuestions(questions);
          if (questions.fallbackNotice) {
            setToastMessage(questions.fallbackNotice);
          }
          setIsLoadingTickets(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error('Failed to load tickets:', err);
          setLoadError(err.message || 'Failed to load tickets');
          setIsLoadingTickets(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentCategory, currentLanguage]);

  // Global keyboard shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Start Exam directly (used by retake, mistakes, etc.)
  const handleStartExam = useCallback((mode = 'exam') => {
    if (!allQuestions || allQuestions.length === 0) return;
    const subset = generateExamQuestions(allQuestions, EXAM_CONFIG.TOTAL_QUESTIONS);
    setExamQuestions(subset);
    setExamMode(mode);
    setActiveView('exam');
  }, [allQuestions]);

  // Start Exam via Wizard (with chosen category and language)
  const handleStartExamFromWizard = async ({ category, language, mistakesLimit }) => {
    if (mistakesLimit) {
      setExamMistakesLimit(mistakesLimit);
    }

    let questionsPool = allQuestions;
    if (category !== currentCategory || language !== currentLanguage) {
      setCurrentCategory(category);
      setCurrentLanguage(language);
      setIsLoadingTickets(true);
      try {
        questionsPool = await fetchTickets(category, language);
        setAllQuestions(questionsPool);
        if (questionsPool.fallbackNotice) {
          setToastMessage(questionsPool.fallbackNotice);
        }
      } catch (err) {
        setLoadError(err.message || 'Failed to load tickets');
        setIsLoadingTickets(false);
        return;
      } finally {
        setIsLoadingTickets(false);
      }
    } else if (allQuestions.fallbackNotice) {
      setToastMessage(allQuestions.fallbackNotice);
    }

    const subset = generateExamQuestions(questionsPool, EXAM_CONFIG.TOTAL_QUESTIONS);
    setExamQuestions(subset);
    setExamMode('exam');
    setActiveView('exam');
  };

  // Start Mistakes Bank Practice
  const handleStartMistakesPractice = useCallback(() => {
    if (mistakesBank.length === 0) return;
    
    // Match mistakes with current language tickets by question id
    const matched = mistakesBank.map(m => {
      const liveQ = allQuestions.find(q => q.id === m.id);
      return liveQ || m;
    });

    setExamQuestions(matched.slice(0, 30));
    setExamMode('mistakes');
    setActiveView('exam');
  }, [mistakesBank, allQuestions]);

  // Exam Finished Handler
  const handleFinishExam = useCallback((result) => {
    // Save attempt to history
    const updatedHistory = saveExamAttempt(result);
    setExamHistory(updatedHistory);

    // Save mistake questions to mistakes bank if any
    if (result.mistakeQuestions && result.mistakeQuestions.length > 0) {
      const updatedMistakes = saveMistakesToBank(result.mistakeQuestions);
      setMistakesBank(updatedMistakes);
    }

    setCurrentResult(result);
    setActiveView('results');
  }, []);

  // Review past exam from history table
  const handleReviewPastExam = useCallback((pastAttempt) => {
    setCurrentResult(pastAttempt);
    setReviewFilter('all');
    setActiveView('review');
  }, []);

  // Clear handlers
  const handleClearHistory = () => {
    if (window.confirm('ნამდვილად გსურთ ისტორიის გასუფთავება?')) {
      clearExamHistory();
      setExamHistory([]);
    }
  };

  const handleClearMistakes = () => {
    if (window.confirm('ნამდვილად გსურთ შეცდომების ბანკის გასუფთავება?')) {
      clearMistakesBank();
      setMistakesBank([]);
    }
  };

  const handleSaveMistakeFromStudy = (question) => {
    const updated = saveMistakesToBank([question]);
    setMistakesBank(updated);
  };

  const isExamView = activeView === 'exam';

  return (
    <div className={`bg-slate-100 dark:bg-[#0d1117] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white transition-colors duration-200 w-full max-w-full overflow-x-hidden ${
      isExamView ? 'h-screen overflow-hidden' : 'min-h-screen pb-20 md:pb-6'
    }`}>
      
      {/* 1. TOP NAVIGATION BAR (Hidden during Exam Mode) */}
      {!isExamView && (
        <Navbar
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          currentLanguage={currentLanguage}
          onSelectLanguage={setCurrentLanguage}
          activeView={activeView}
          onNavigate={handleNavigateView}
          mistakesCount={mistakesBank.length}
          onOpenSearch={() => setIsSearchOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* 2. MAIN FLOATING CANVAS CONTAINER (max-w-7xl wide layout, aligned with Navbar) */}
      <main className={`relative z-10 flex-1 w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex flex-col min-w-0 ${
        isExamView ? 'p-2 sm:p-3 h-full overflow-hidden' : 'py-2 sm:py-4'
      }`}>
        
        {/* The Large Neo-Brutalist Floating Canvas */}
        <div className={`flex-1 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-[20px] sm:rounded-[32px] shadow-[3px_3px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] dark:shadow-[3px_3px_0px_#000] sm:dark:shadow-[6px_6px_0px_#000] relative flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isExamView ? 'p-2 sm:p-3 overflow-hidden h-full' : 'p-3 sm:p-6 lg:p-8'
        }`}>
          
          {/* Loading or Error Banners */}
          {isLoadingTickets && (
            <div className="absolute inset-0 z-30 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-sm rounded-[32px] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                ბილეთების ბაზა იტვირთება...
              </span>
            </div>
          )}

          {loadError && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="font-black">შეცდომა ბილეთების ჩატვირთვისას:</span> {loadError}
              </div>
            </div>
          )}

          {/* Views Router (Smooth Fade-in on language change with ErrorBoundary) */}
          <div key={currentLanguage} className="flex-1 flex flex-col min-h-0 animate-fade-in transition-all">
            <ErrorBoundary onReset={() => setActiveView('dashboard')}>
            {activeView === 'dashboard' && (
              <Dashboard
                examHistory={examHistory}
                mistakesBank={mistakesBank}
                currentCategory={currentCategory}
                onSelectCategory={setCurrentCategory}
                currentLanguage={currentLanguage}
                examMistakesLimit={examMistakesLimit}
                onSetExamMistakesLimit={setExamMistakesLimit}
                onStartExam={() => setIsExamWizardOpen(true)}
                onNavigateToStudy={() => setActiveView('study')}
                onStartMistakesPractice={handleStartMistakesPractice}
                onReviewPastExam={handleReviewPastExam}
                onClearHistory={handleClearHistory}
                onClearMistakes={handleClearMistakes}
                onOpenSearch={() => setIsSearchOpen(true)}
                onNavigateToArticles={() => handleNavigateToArticles(null)}
              />
            )}

            {activeView === 'articles' && (
              <ArticlesView
                articleSlug={activeArticleSlug}
                onSelectArticle={(slug) => handleNavigateToArticles(slug)}
                onBackToArticles={handleBackToArticlesCatalog}
                onBackToDashboard={handleBackToDashboardFromArticles}
                onStartExam={() => setIsExamWizardOpen(true)}
              />
            )}

            {activeView === 'mistakes' && (
              <MistakesView
                mistakes={mistakesBank}
                currentCategory={currentCategory}
                currentLanguage={currentLanguage}
                onStartPractice={handleStartMistakesPractice}
                onClearMistakes={handleClearMistakes}
                onRemoveMistake={(id) => {
                  const updated = removeMistakeFromBank(id);
                  setMistakesBank(updated);
                }}
                onBackToDashboard={() => setActiveView('dashboard')}
                onStartExam={() => setIsExamWizardOpen(true)}
                onNavigateToStudy={() => setActiveView('study')}
                onInspectImage={(imageId, text) => setZoomImage({ imageId, questionText: text })}
              />
            )}

            {activeView === 'study' && (
              <StudyModeView
                questions={allQuestions}
                category={currentCategory}
                language={currentLanguage}
                onInspectImage={(imageId, text) => setZoomImage({ imageId, questionText: text })}
                onStartExam={() => setIsExamWizardOpen(true)}
                onSaveToMistakes={handleSaveMistakeFromStudy}
                onBackToDashboard={() => setActiveView('dashboard')}
              />
            )}

            {activeView === 'exam' && (
              <ExamView
                questions={examQuestions}
                category={currentCategory}
                language={currentLanguage}
                examMode={examMode}
                maxAllowedMistakes={examMistakesLimit}
                onFinishExam={handleFinishExam}
                onCancelExam={() => setActiveView('dashboard')}
                onInspectImage={(imageId, text) => setZoomImage({ imageId, questionText: text })}
              />
            )}

            {activeView === 'results' && currentResult && (
              <ResultsView
                resultData={currentResult}
                onReviewMistakes={() => {
                  setReviewFilter('mistakes');
                  setActiveView('review');
                }}
                onReviewAll={() => {
                  setReviewFilter('all');
                  setActiveView('review');
                }}
                onRetakeExam={() => handleStartExam(examMode)}
                onBackToDashboard={() => setActiveView('dashboard')}
                currentLanguage={currentLanguage}
              />
            )}

            {activeView === 'review' && currentResult && (
              <ReviewView
                questions={currentResult.questions || []}
                userAnswers={currentResult.answers || {}}
                initialFilter={reviewFilter}
                onBackToResults={() => setActiveView('results')}
                onBackToDashboard={() => setActiveView('dashboard')}
                onInspectImage={(imageId, text) => setZoomImage({ imageId, questionText: text })}
                onRemoveFromMistakes={(id) => {
                  const updated = removeMistakeFromBank(id);
                  setMistakesBank(updated);
                }}
                currentLanguage={currentLanguage}
              />
            )}
            </ErrorBoundary>
          </div>

          {/* Footer inside canvas with Privacy, Rules, and Feedback modals */}
          {!isExamView && (
            <Footer
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
              onOpenRules={() => setIsRulesOpen(true)}
              onOpenFeedback={() => setIsFeedbackOpen(true)}
              onNavigateToArticles={() => handleNavigateToArticles(null)}
            />
          )}

        </div>

      </main>

      {/* 3. MODALS */}
      {/* Exam Wizard Setup Modal */}
      <ExamWizardModal
        isOpen={isExamWizardOpen}
        onClose={() => setIsExamWizardOpen(false)}
        initialCategory={currentCategory}
        initialLanguage={currentLanguage}
        onStartExam={handleStartExamFromWizard}
        examMistakesLimit={examMistakesLimit}
        onSetExamMistakesLimit={setExamMistakesLimit}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[200] max-w-sm sm:max-w-md bg-white dark:bg-[#1E293B] border-2 border-slate-900 dark:border-slate-600 p-3.5 rounded-2xl shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] flex items-center justify-between gap-3 text-xs font-bold text-slate-900 dark:text-slate-100 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
              <Info className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            aria-label="დახურვა"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <ImageZoomModal
          imageId={zoomImage.imageId}
          questionText={zoomImage.questionText}
          onClose={() => setZoomImage(null)}
        />
      )}

      {/* Search & Question Explorer Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        questions={allQuestions}
        language={currentLanguage}
        onInspectImage={(imageId, text) => setZoomImage({ imageId, questionText: text })}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Exam Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Feedback / Bug Report Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 4. MOBILE STICKY BOTTOM NAVIGATION BAR (Thumb-friendly Neo-Brutalist App Bar) */}
      {!isExamView && (
        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-white/95 dark:bg-[#161b22]/95 backdrop-blur-md border-2 border-slate-900 dark:border-slate-700 rounded-2xl shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] px-2 py-1 flex items-center justify-around">
          <button
            onClick={() => handleNavigateView('dashboard')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-black transition-colors min-h-[44px] justify-center ${
              activeView === 'dashboard'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 stroke-[2.2]" />
            <span>მთავარი</span>
          </button>

          <button
            onClick={() => handleNavigateView('study')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-black transition-colors min-h-[44px] justify-center ${
              activeView === 'study'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
            <span>ბილეთები</span>
          </button>

          <button
            onClick={() => handleNavigateView('mistakes')}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-black transition-colors min-h-[44px] justify-center relative ${
              activeView === 'mistakes'
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="relative">
              <Bookmark className="w-5 h-5 stroke-[2.2]" />
              {mistakesBank.length > 0 && (
                <span className="absolute -top-1 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-500 text-white border border-white dark:border-slate-900">
                  {mistakesBank.length}
                </span>
              )}
            </div>
            <span>შეცდომები</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-[11px] font-black text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-h-[44px] justify-center"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
            <span>ძებნა</span>
          </button>
        </nav>
      )}

    </div>
  );
}

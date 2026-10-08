import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Bus, 
  Wrench, 
  Shield, 
  Search, 
  ChevronDown, 
  Bookmark, 
  LayoutDashboard,
  BookOpen,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { CATEGORIES, LANGUAGES } from '../utils/constants';
import { getT } from '../utils/i18n';

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

export default function Navbar({ 
  currentCategory, 
  onSelectCategory, 
  currentLanguage, 
  onSelectLanguage,
  activeView,
  onNavigate,
  mistakesCount = 0,
  onOpenSearch,
  theme = 'light',
  onToggleTheme
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const catMenuRef = useRef(null);
  const langMenuRef = useRef(null);
  const t = getT(currentLanguage);

  // Close dropdowns on outside click or Esc key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catMenuRef.current && !catMenuRef.current.contains(e.target)) {
        setCatMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCatMenuOpen(false);
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeCategoryObj = CATEGORIES.find(c => c.id === currentCategory) || CATEGORIES[0];
  const activeLangObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];
  const IconComponent = CATEGORY_ICONS[currentCategory] || Car;

  const handleMobileNav = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-[100] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      {/* Sleek, Wide & Balanced Floating Navbar (max-w-7xl perfectly aligned with Main container) */}
      <div className="w-full bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-2xl sm:rounded-full px-3.5 py-2 sm:px-6 sm:py-2.5 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-2.5 sm:gap-4 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Left: Brand Logo & Domain Badge */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 group focus:outline-none min-h-[44px]"
            aria-label="eTeoria Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
                eTeoria
              </span>
              <span className="text-[10px] font-black tracking-normal bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full hidden sm:inline-block">
                eteoria.online
              </span>
            </div>
          </button>
        </div>

        {/* Center: Rounded Pill Navigation (Dashboard, Study, Mistakes) - Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-[#21262d] p-1 rounded-full border border-slate-300 dark:border-slate-600 shadow-inner">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 min-h-[36px] ${
              activeView === 'dashboard'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.dashboard}</span>
          </button>
          
          <button
            onClick={() => onNavigate('study')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 min-h-[36px] ${
              activeView === 'study'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.studyMode}</span>
          </button>
          
          <button
            onClick={() => onNavigate('mistakes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 min-h-[36px] ${
              activeView === 'mistakes'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t.practiceMistakes}</span>
            {mistakesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-500 text-white ml-0.5">
                {mistakesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Controls: Search, Category, Language, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Search Trigger Button (Desktop/Tablet) */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-[#21262d] hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-full border-2 border-slate-900 dark:border-slate-600 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all min-h-[44px]"
            title="ძებნა (⌘K)"
            aria-label="Search questions"
          >
            <Search className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <kbd className="hidden lg:inline text-[9px] bg-white dark:bg-[#161b22] text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Category Dropdown */}
          <div ref={catMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCatMenuOpen(!catMenuOpen);
                setLangMenuOpen(false);
              }}
              className="flex items-center gap-1 sm:gap-2 bg-slate-50 dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 border-slate-900 dark:border-slate-600 text-xs font-black transition-all shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[40px] sm:min-h-[44px] cursor-pointer"
              title={t.categorySelect}
            >
              <IconComponent className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="max-w-[48px] sm:max-w-none truncate text-[11px] sm:text-xs">{activeCategoryObj.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
            </button>

            {catMenuOpen && (
              <>
                <div 
                  className="sm:hidden fixed inset-0 z-[110] bg-black/30 backdrop-blur-[1px]" 
                  onClick={() => setCatMenuOpen(false)} 
                />
                <div className="fixed inset-x-3 top-18 sm:absolute sm:top-full sm:inset-auto sm:right-0 sm:mt-2 w-auto sm:w-72 max-w-sm sm:max-w-none mx-auto sm:mx-0 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-600 rounded-3xl shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_#000] p-2 z-[150] animate-fade-in">
                  <div className="px-3 py-2 text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    {t.categorySelect}
                  </div>
                  <div className="py-1.5 max-h-80 overflow-y-auto space-y-1">
                    {CATEGORIES.map(cat => {
                      const CatIcon = CATEGORY_ICONS[cat.id] || Car;
                      const isSelected = cat.id === currentCategory;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setCatMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-left text-xs transition-all duration-150 min-h-[44px] cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-600 text-white font-black shadow-[2px_2px_0px_#312e81]' 
                              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-medium'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                            isSelected 
                              ? 'bg-indigo-500 text-white border-indigo-400' 
                              : 'bg-slate-100 dark:bg-[#21262d] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                          }`}>
                            <CatIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-black">{cat.name}</div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                              {cat.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setCatMenuOpen(false);
              }}
              className="flex items-center gap-1 sm:gap-1.5 bg-slate-50 dark:bg-[#21262d] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 border-slate-900 dark:border-slate-600 text-xs font-black transition-all shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-h-[40px] sm:min-h-[44px] cursor-pointer"
              title={t.languageSelect}
            >
              <span className="text-sm">{activeLangObj.flag}</span>
              <span className="hidden sm:inline font-black">{activeLangObj.short}</span>
              <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="sm:hidden fixed inset-0 z-[110] bg-black/30 backdrop-blur-[1px]" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="fixed inset-x-3 top-18 sm:absolute sm:top-full sm:inset-auto sm:right-0 sm:mt-2 w-auto sm:w-60 max-w-xs sm:max-w-none mx-auto sm:mx-0 bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-600 rounded-3xl shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_#000] p-2 z-[150] animate-fade-in">
                  <div className="px-3 py-2 text-[11px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    {t.languageSelect}
                  </div>
                  <div className="py-1.5 space-y-1">
                    {LANGUAGES.map(lang => {
                      const isSelected = lang.code === currentLanguage;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors duration-150 min-h-[40px] cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-600 text-white font-black shadow-[2px_2px_0px_#312e81]' 
                              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-medium'
                          }`}
                        >
                          <span className="flex items-center gap-2 font-bold">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                          </span>
                          <span className={`text-[10px] font-black ${isSelected ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                            {lang.short}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle (Sun / Moon) */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-full border-2 border-slate-900 dark:border-slate-600 bg-amber-50 dark:bg-[#21262d] text-amber-600 dark:text-amber-400 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:bg-amber-100 dark:hover:bg-slate-700 transition-all cursor-pointer min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center shrink-0"
            title={theme === 'dark' ? 'სინათლის რეჟიმი' : 'მუქი რეჟიმი'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-800 stroke-[2.5]" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}


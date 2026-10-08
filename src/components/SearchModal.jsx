import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, CheckCircle, Image as ImageIcon, ExternalLink, HelpCircle } from 'lucide-react';
import { getT } from '../utils/i18n';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  questions = [], 
  language = 'Geo',
  onInspectImage
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const t = getT(language);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return questions.slice(0, 15);
    const query = searchTerm.toLowerCase().trim();
    return questions.filter(q => 
      q.question.toLowerCase().includes(query) ||
      String(q.id).includes(query) ||
      q.answers.some(a => a.answer.toLowerCase().includes(query))
    ).slice(0, 30);
  }, [questions, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-3xl bg-[#161920] border-2 border-slate-700 rounded-4xl shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-slate-800 flex items-center gap-3 bg-[#12141a]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-500 font-bold"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-bold">
              შედეგი ვერ მოიძებნა: "{searchTerm}"
            </div>
          ) : (
            filteredQuestions.map(q => {
              const isSelected = selectedQuestion?.id === q.id;
              return (
                <div 
                  key={q.id}
                  onClick={() => setSelectedQuestion(isSelected ? null : q)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800 border-indigo-500 shadow-md' 
                      : 'bg-[#12141a] border-slate-800 hover:border-slate-700 hover:bg-[#181b22]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        #{q.id}
                      </span>
                      {q.imageId && (
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectImage(q.imageId, q.question);
                          }}
                          className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                        >
                          <ImageIcon className="w-3 h-3 text-indigo-400" />
                          სურათი #{q.imageId}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {q.answers.length} ვარიანტი
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-200 font-bold line-clamp-2">
                    {q.question}
                  </p>

                  {/* Expanded view showing options & right answer */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2 animate-fade-in">
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                        სავარაუდო პასუხები:
                      </div>
                      <div className="space-y-1.5">
                        {q.answers.map((ans, idx) => {
                          const isRight = ans.answerNumbering === q.rightAnswer;
                          const letter = String.fromCharCode(65 + idx);
                          return (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-xl text-xs flex items-start gap-2.5 border-2 ${
                                isRight
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-300 font-medium'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${
                                isRight ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {letter}
                              </span>
                              <span className="flex-1">{ans.answer}</span>
                              {isRight && (
                                <span className="text-[10px] font-black text-emerald-300 bg-emerald-500/30 px-2 py-0.5 rounded-lg border border-emerald-500/40">
                                  {t.correct}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#12141a] border-t-2 border-slate-800 text-xs text-slate-400 flex items-center justify-between font-bold">
          <span>ნაჩვენებია {filteredQuestions.length} / {questions.length} კითხვა</span>
          <span className="text-[11px]">დააჭირეთ კითხვას პასუხის სანახავად</span>
        </div>
      </div>
    </div>
  );
}

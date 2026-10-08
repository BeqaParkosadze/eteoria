import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'რამდენი კითხვაა B კატეგორიის თეორიულ გამოცდაზე და რამდენი შეცდომის უფლებაა?',
    a: 'B და B1 კატეგორიის თეორიული გამოცდა შედგება 30 საგამოცდო ბილეთისგან. გამოცდის წარმატებით ჩასაბარებლად საჭიროა მინიმუმ 27 სწორი პასუხი (დასაშვებია მაქსიმუმ 3 შეცდომა).'
  },
  {
    id: 'faq-2',
    q: 'რა დრო ეძლევა გამოსაცდელს ტესტის ჩასაბარებლად?',
    a: 'ტესტირების ხანგრძლივობა შეადგენს 30 წუთს. საშუალოდ თითოეულ კითხვაზე 1 წუთია გათვალისწინებული.'
  },
  {
    id: 'faq-3',
    q: 'როგორ მუშაობს შეცდომების ბანკი eTeoria-ზე?',
    a: 'სიმულატორში ან ბილეთების ვარჯიშისას დაშვებული ყველა შეცდომა ავტომატურად ინახება „შეცდომების ბანკში“, რაც გაძლევთ საშუალებას რთული კითხვები გადაიმეოროთ და გამოასწოროთ შედეგი.'
  },
  {
    id: 'faq-4',
    q: 'ემთხვევა თუ არა ბილეთები სააგენტოს ოფიციალურ გამოცდას?',
    a: 'დიახ, eTeoria იყენებს საქართველოს შსს მომსახურების სააგენტოს ოფიციალურ, უახლეს საგამოცდო ბაზას და სრულად შეესაბამება მოქმედ სტანდარტს.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // Open first item by default for rich UX

  const toggleItem = (idx) => {
    setOpenIndex(prev => prev === idx ? -1 : idx);
  };

  return (
    <section 
      aria-labelledby="faq-heading"
      className="w-full bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_0px_#000] space-y-6 transition-colors"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ცოდნის ბაზა • FAQ</span>
          </div>
          <h2 
            id="faq-heading"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2.5"
          >
            <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>ხშირად დასმული კითხვები</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
            ყველაზე ხშირი კითხვა-პასუხი მართვის მოწმობის თეორიული გამოცდის, ბილეთებისა და წესების შესახებ
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-slate-100 dark:bg-[#21262d] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 self-start sm:self-auto">
          4 ოფიციალური პასუხი
        </span>
      </div>

      {/* Accordion List */}
      <div className="space-y-3" role="tablist">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div
              key={item.id}
              className={`border-2 rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-indigo-50/50 dark:bg-[#21262d] border-indigo-600 dark:border-indigo-500 shadow-[3px_3px_0px_#4f46e5]'
                  : 'bg-slate-50 dark:bg-[#1a202c] border-slate-900 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-slate-500 shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000]'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-black text-sm sm:text-base text-slate-900 dark:text-slate-100 min-h-[52px] cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 border ${
                    isOpen
                      ? 'bg-indigo-600 text-white border-indigo-700'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{item.q}</span>
                </span>
                
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-transform duration-200 shrink-0 ${
                  isOpen
                    ? 'rotate-180 bg-indigo-600 text-white border-indigo-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                }`}>
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700/80"
                >
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

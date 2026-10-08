import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, X, Clock, Sparkles } from 'lucide-react';

const GUIDES = [
  {
    id: 'guide-strategy',
    category: 'გამოცდის სტრუქტურა',
    tagColor: 'indigo',
    icon: CheckCircle2,
    readTime: '3 წთ საკითხავი',
    title: 'როგორ ჩავაბაროთ თეორიული გამოცდა პირველივე ცდაზე?',
    excerpt: 'მართვის მოწმობის B კატეგორიის გამოცდაზე წარმატების მთავარი გასაღები სისტემური მიდგომაა. ნუ დაიზეპირებთ პასუხებს — გაიაზრეთ საგზაო მოძრაობის ლოგიკა. დაიწყეთ თემატური ბილეთებით, შეინახეთ რთული კითხვები შეცდომების ბანკში და დღეში მინიმუმ 2-3 სრული 30-კითხვიანი სიმულაცია გაიარეთ.',
    fullContent: [
      '1. სისტემური მომზადება: საგამოცდო ბილეთების ბრმად დაზეპირება ხშირად იწვევს დაბნეულობას საგამოცდო ცენტრში, სადაც კითხვების თანმიმდევრობა და ვარიანტები შემთხვევითად გენერირდება. უპირველესად ისწავლეთ საგზაო მოძრაობის ზოგადი წესები და პრიორიტეტები.',
      '2. თემატური სწავლება: დაიწყეთ ბილეთების თემატურად გავლა — საგზაო ნიშნები, შუქნიშნები, გასწრება და დგომა-გაჩერება.',
      '3. შეცდომების ბანკის გამოყენება: ყველა კითხვა, რომელზეც შეცდომას დაუშვებთ, ავტომატურად ინახება თქვენს შეცდომების ბანკში. გამოცდამდე აუცილებლად გაიარეთ მხოლოდ შეცდომების სესია 100%-იან შედეგამდე.',
      '4. რეალური სიმულაციები: დღეში გაიარეთ მინიმუმ 2-3 სრული 30-წუთიანი გამოცდა ოფიციალური 3-შეცდომიანი ლიმიტით.'
    ]
  },
  {
    id: 'guide-intersections',
    category: 'რთული ბილეთები',
    tagColor: 'amber',
    icon: AlertTriangle,
    readTime: '4 წთ საკითხავი',
    title: 'გზაჯვარედინის გავლის წესები — ყველაზე ხშირი შეცდომები',
    excerpt: 'საგამოცდო ბილეთებში ყველაზე მეტი შეცდომა მარჯვნიდან დაბრკოლების წესსა და რეგულირებად გზაჯვარედინებზე მოდის. გახსოვდეთ: შუქნიშნის მოქმედების ზონაში პრიორიტეტის ნიშნები უქმდება, ხოლო თანაბარმნიშვნელოვან გზაზე უპირატესობა ყოველთვის მარჯვნიდან მოძრავ სატრანსპორტო საშუალებას ენიჭება.',
    fullContent: [
      '1. იერარქიის ოქროს წესი: რეგულირებად გზაჯვარედინზე უპირატესობის იერარქია მკაცრად არის განსაზღვრული: რეგულირების სიგნალი (მარეგულირებელი) > შუქნიშანი > პრიორიტეტის საგზაო ნიშნები > მარჯვნიდან დაბრკოლების წესი.',
      '2. მოქმედი შუქნიშანი: როდესაც შუქნიშანი მუშაობს, პრიორიტეტის ნიშნები („მთავარი გზა“, „დაუთმეთ გზა“) არ მოქმედებს! ისინი ძალაში შედის მხოლოდ მაშინ, როდესაც შუქნიშანი გამორთულია ან მოციმციმე ყვითელ რეჟიმშია.',
      '3. მარჯვნიდან დაბრკოლება: თანაბარმნიშვნელოვან გზაჯვარედინზე მძღოლი ვალდებულია გზა დაუთმოს მარჯვნიდან მოახლოებულ სატრანსპორტო საშუალებას.',
      '4. მარცხნივ მოხვევა: მარცხნივ მოხვევისას ყოველთვის ვუთმობთ გზას პირდაპირ და მარჯვნივ მოძრავ სატრანსპორტო საშუალებებს.'
    ]
  },
  {
    id: 'guide-signs',
    category: 'საგზაო ნიშნები',
    tagColor: 'emerald',
    icon: ShieldCheck,
    readTime: '3 წთ საკითხავი',
    title: 'საგზაო ნიშნების კლასიფიკაცია და 2026 წლის ცვლილებები',
    excerpt: 'საგზაო ნიშნები იყოფა 6 ძირითად ჯგუფად: მაფრთხილებელი, პრიორიტეტის, ამკრძალავი, მიმთითებელი, საინფორმაციო და სერვისის. განსაკუთრებული ყურადღება მიაქციეთ ეკო-მართვისა და ელექტრომობილებისთვის განკუთვნილ განახლებულ საინფორმაციო დაფებს.',
    fullContent: [
      '1. მაფრთხილებელი ნიშნები: სამკუთხა წითელარშიიანი ნიშნები, რომლებიც გაფრთხილებთ საფრთხის შესახებ დასახლებულ პუნქტში 50-100 მეტრით, ხოლო დაუსახლებელში 150-300 მეტრით ადრე.',
      '2. პრიორიტეტის ნიშნები: არეგულირებს გზაჯვარედინების, გზის სავალი ნაწილის ვიწრო მონაკვეთების გავლის რიგითობას.',
      '3. ამკრძალავი ნიშნები: მრგვალი ფორმის ნიშნები წითელი არშიით — აწესებს ან აუქმებს მოძრაობის გარკვეულ შეზღუდვებს.',
      '4. 2026 წლის განახლებები: ყურადღება მიაქციეთ ეკოლოგიური ზონების, ელექტრომობილების დამტენი სადგურებისა და ველობილიკების განახლებულ საინფორმაციო და მიმთითებელ ნიშნებს.'
    ]
  }
];

export default function GuidesSection({ onNavigateToArticles }) {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const handleOpenArticles = () => {
    if (onNavigateToArticles) {
      onNavigateToArticles();
    } else {
      window.location.href = '/statiiebi';
    }
  };

  return (
    <section 
      aria-labelledby="guides-heading"
      className="w-full bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] dark:shadow-[5px_5px_0px_0px_#000] space-y-6 transition-colors"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>სასარგებლო სტატიები • 2026</span>
          </div>
          <h2 
            id="guides-heading"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2.5"
          >
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>საგამოცდო გზამკვლევები და რჩევები</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
            ექსპერტების რეკომენდაციები, რთული ბილეთების გარჩევა და საგზაო ნიშნების დეტალური ანალიზი
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleOpenArticles}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
          >
            <span>ყველა სტატია და გზამკვლევი</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {GUIDES.map((guide) => {
          const Icon = guide.icon;
          const badgeStyles = guide.tagColor === 'indigo'
            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
            : guide.tagColor === 'amber'
            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';

          return (
            <article
              key={guide.id}
              className="bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-[3px_3px_0px_0px_#0f172a] dark:shadow-[3px_3px_0px_0px_#000] flex flex-col justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <div className="space-y-3.5">
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${badgeStyles}`}>
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug font-['Plus_Jakarta_Sans',sans-serif]">
                  {guide.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
                  {guide.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(guide)}
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border-2 border-slate-900 dark:border-slate-700 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-between min-h-[40px] cursor-pointer"
                  aria-label={`სრულად წაკითხვა: ${guide.title}`}
                >
                  <span>სრულად წაკითხვა</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-modal-title"
        >
          <div className="relative w-full max-w-xl bg-white dark:bg-[#161b22] border-3 border-slate-900 dark:border-slate-700 rounded-3xl shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col text-slate-900 dark:text-slate-100 max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-[#21262d] flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-800">
                {selectedGuide.category}
              </span>

              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                aria-label="დახურვა"
                className="p-1.5 rounded-full border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-[1px_1px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-200">
              <h3 id="guide-modal-title" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {selectedGuide.title}
              </h3>

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-bold text-xs sm:text-sm">
                {selectedGuide.excerpt}
              </div>

              <div className="space-y-3 pt-2">
                {selectedGuide.fullContent.map((paragraph, pIdx) => (
                  <p key={pIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#21262d] border border-slate-200 dark:border-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#21262d] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                გასაგებია
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

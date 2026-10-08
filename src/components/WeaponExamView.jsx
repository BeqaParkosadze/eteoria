import React, { useEffect } from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  HeartHandshake, 
  Scale, 
  Crosshair,
  Bell
} from 'lucide-react';

export default function WeaponExamView({
  onBackToDashboard,
  onNavigateToArticle
}) {
  // Sync document head metadata specifically for /iaragis-biletebi route
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta ? descMeta.getAttribute('content') : '';
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink ? canonicalLink.getAttribute('href') : '';
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    const prevKeywords = keywordsMeta ? keywordsMeta.getAttribute('content') : '';

    // Update to Weapon Exam sub-route metadata
    document.title = 'იარაღის გამოცდის ბილეთები 2026 | ტესტები და წესები | eteoria.online';
    if (descMeta) {
      descMeta.setAttribute('content', 'მოემზადე იარაღის შეძენის/შენახვის უფლების გამოცდისთვის. 2026 წლის იარაღის საგამოცდო ბილეთები და ტესტები განმარტებებით.');
    }
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://www.eteoria.online/iaragis-biletebi');
    }
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', 'იარაღის გამოცდის ბილეთები, iaragis biletebi, iaragis gamocda 2026, iaragis shedzena testi, თავდაცვითი იარაღის ტესტები, eteoria');
    }

    return () => {
      // Restore on unmount
      document.title = prevTitle;
      if (descMeta) descMeta.setAttribute('content', prevDesc);
      if (canonicalLink) canonicalLink.setAttribute('href', prevCanonical || 'https://www.eteoria.online/');
      if (keywordsMeta) keywordsMeta.setAttribute('content', prevKeywords);
    };
  }, []);

  const handleOpenGuide = () => {
    if (onNavigateToArticle) {
      onNavigateToArticle('iaragis-gamocdis-biletebi-teoria');
    } else {
      window.location.href = '/statiiebi/iaragis-gamocdis-biletebi-teoria';
    }
  };

  return (
    <article className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-slate-100 dark:border-slate-800">
        <button
          onClick={onBackToDashboard}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black shadow-[2px_2px_0px_#0f172a] dark:shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>მთავარზე დაბრუნება</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>ახალი განყოფილება • 2026</span>
        </span>
      </div>

      {/* Hero Header Card */}
      <header className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-4xl p-6 sm:p-8 md:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-[6px_6px_0px_0px_#000] space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Crosshair className="w-3.5 h-3.5" />
            <span>იარაღის შეძენა • შენახვა • ტარება</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            შსს მომსახურების სააგენტო
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
          იარაღის გამოცდის ბილეთები (2026)
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-bold max-w-3xl">
          მოემზადე თავდაცვის, სანადირო და სპორტული იარაღის შეძენის/შენახვის უფლების თეორიული გამოცდისთვის. 
          საქართველოს მოქმედი კანონმდებლობის შესაბამისი საგამოცდო ბილეთები, უსაფრთხოების ნორმები და 
          სისხლის სამართლის კოდექსის განმარტებები.
        </p>

        {/* Exam Parameter Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>კითხვების რაოდენობა</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">20 ბილეთი</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>გამსვლელი ბარიერი</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">18 სწორი (90%)</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>გამოცდის დრო</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">20 წუთი</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#21262d] border-2 border-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>მაქს. შეცდომა</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">2 შეცდომა</div>
          </div>
        </div>
      </header>

      {/* Status Notice / Teaser Card */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-600 dark:border-amber-700 rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_#b45309] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 border-2 border-slate-900 mt-0.5">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-sm font-black text-amber-950 dark:text-amber-200">
              საგამოცდო ბილეთების ბაზა მზადების პროცესშია
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 font-bold mt-0.5 max-w-xl">
              შსს მომსახურების სააგენტოს იარაღის თეორიული გამოცდის ინტერაქტიული სიმულატორი უახლოეს დღეებში გააქტიურდება. 
              მანამდე შეგიძლიათ გაეცნოთ საგამოცდო თემებსა და კანონმდებლობის დეტალურ ანალიზს.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenGuide}
          type="button"
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <BookOpen className="w-4 h-4" />
          <span>სრული გზამკვლევი</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Core Examination Syllabus / 4 Pillars Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              საგამოცდო თემატიკა და პროგრამა
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
              4 ძირითადი მიმართულება, რომელსაც მოიცავს იარაღის თეორიული ტესტირება
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Legal Requirements */}
          <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                1. იარაღის ბრუნვის სამართლებრივი რეჟიმი
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
              საქართველოს კანონი „იარაღის შესახებ“ — სამოქალაქო იარაღის სახეები, შეძენის, რეგისტრაციის, 
              ხელახალი გადაფორმებისა და ჩამორთმევის საფუძვლები, ასაკობრივი ცენზი და სააგენტოს ნებართვები.
            </p>
          </div>

          {/* 2. Storage & Safety */}
          <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                2. შენახვისა და ტარების უსაფრთხოება
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
              საცხოვრებელ ადგილას ლითონის სეიფში იარაღის განმუხტულ მდგომარეობაში შენახვა, საბრძოლო მასალის იზოლაცია, 
              მესამე პირების წვდომის გამორიცხვა, გადატანის წესები და ბუდით (შალითით) ტარების რეგულაცია.
            </p>
          </div>

          {/* 3. Self-defense Law */}
          <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                3. აუცილებელი მოგერიება და უკიდურესი აუცილებლობა
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
              საქართველოს სისხლის სამართლის კოდექსის 28-ე და 30-ე მუხლები. იარაღის გამოყენების კანონიერი ზღვარი, 
              მოსალოდნელი ხელყოფის რეალობა, აუცილებელი მოგერიების ფარგლების გადაცილების პასუხისმგებლობა.
            </p>
          </div>

          {/* 4. First Aid */}
          <div className="bg-white dark:bg-[#161b22] border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_#000] space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                4. გადაუდებელი პირველადი დახმარება
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
              ცეცხლსასროლი და ტრავმული ჭრილობების დროს სისხლდენის შეჩერება (ლახტის დადება, დამწოლი ნახვევი), 
              ტრავმული შოკის პრევენცია, სასუნთქი გზების გამავლობის უზრუნველყოფა და 112-ის გამოძახების ალგორითმი.
            </p>
          </div>

        </div>
      </section>

      {/* Direct Guide CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[5px_5px_0px_#0f172a]">
        <div className="space-y-1.5 max-w-xl">
          <div className="text-xs font-black text-indigo-400 uppercase tracking-wider">
            სასარგებლო რესურსი
          </div>
          <h3 className="text-lg sm:text-xl font-black">
            იარაღის თეორიული გამოცდის დეტალური გზამკვლევი (2026)
          </h3>
          <p className="text-xs text-slate-300 font-medium">
            წაიკითხეთ ექსპერტების მიერ მომზადებული ვრცელი მასალა იარაღის შეძენის ნებართვის მიღების პროცესზე, 
            სამედიცინო ცნობაზე (ფორმა 100), ნასამართლობის შემოწმებასა და სააგენტოში გასავლელ ეტაპებზე.
          </p>
        </div>

        <button
          onClick={handleOpenGuide}
          type="button"
          className="whitespace-nowrap px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black border-2 border-indigo-400 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>სტატიის წაკითხვა</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </article>
  );
}

import type { ReactNode } from 'react';

export const metadata = {
  metadataBase: new URL('https://eteoria.online'),
  title: {
    default: 'მართვის მოწმობის თეორიის ბილეთები 2026 | eTeoria',
    template: '%s | eTeoria',
  },
  description:
    'ჩააბარე მართვის მოწმობის თეორიული გამოცდა მარტივად. 2026 წლის განახლებული ბილეთები, თემატური ტესტები და განმარტებები უფასოდ.',
  keywords: [
    'მართვის მოწმობის ბილეთები',
    'B კატეგორია',
    'A კატეგორია მოტოციკლი',
    'C კატეგორია',
    'D კატეგორია',
    'სამხედრო მართვის მოწმობა',
    'იარაღის გამოცდის ბილეთები',
    'iaragis biletebi',
    'თავდაცვითი იარაღის ტესტები',
    'pravis biletebi',
    'eteoria',
    'მართვის თეორია',
    'საგამოცდო ბილეთები 2026',
    'სააგენტოს ბილეთები',
    'საგზაო ნიშნები',
  ],
  alternates: {
    canonical: 'https://eteoria.online/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ka_GE',
    url: 'https://eteoria.online/',
    siteName: 'eTeoria',
    title: 'მართვის მოწმობის თეორიის ბილეთები 2026 | eTeoria',
    description:
      'ჩააბარე მართვის მოწმობის თეორიული გამოცდა მარტივად. 2026 წლის განახლებული ბილეთები და განმარტებები.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'eTeoria - მართვის მოწმობის თეორიის ბილეთები 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'მართვის მოწმობის თეორიის ბილეთები 2026 | eTeoria',
    description:
      'ჩააბარე მართვის მოწმობის თეორიული გამოცდა მარტივად. 2026 წლის განახლებული ბილეთები.',
    images: ['/og-image.png'],
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'eTeoria',
  url: 'https://eteoria.online',
  inLanguage: 'ka-GE',
  description:
    'მართვის მოწმობის თეორიული გამოცდის სიმულატორი და ოფიციალური საგამოცდო ბილეთები 2026',
};

const jsonLdWebApplication = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'eTeoria - მართვის მოწმობის სიმულატორი',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GEL',
  },
  inLanguage: 'ka-GE',
  url: 'https://eteoria.online',
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'რამდენი კითხვაა B კატეგორიის თეორიულ გამოცდაზე და რამდენი შეცდომის უფლებაა?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'B და B1 კატეგორიის თეორიული გამოცდა შედგება 30 საგამოცდო ბილეთისგან. გამოცდის წარმატებით ჩასაბარებლად საჭიროა მინიმუმ 27 სწორი პასუხი (დასაშვებია მაქსიმუმ 3 შეცდომა).',
      },
    },
    {
      '@type': 'Question',
      name: 'რა დრო ეძლევა გამოსაცდელს ტესტის ჩასაბარებლად?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ტესტირების ხანგრძლივობა შეადგენს 30 წუთს. საშუალოდ თითოეულ კითხვაზე 1 წუთია გათვალისწინებული.',
      },
    },
    {
      '@type': 'Question',
      name: 'როგორ მუშაობს შეცდომების ბანკი eTeoria-ზე?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'სიმულატორში ან ბილეთების ვარჯიშისას დაშვებული ყველა შეცდომა ავტომატურად ინახება „შეცდომების ბანკში“, რაც გაძლევთ საშუალებას რთული კითხვები გადაიმეოროთ და გამოასწოროთ შედეგი.',
      },
    },
    {
      '@type': 'Question',
      name: 'ემთხვევა თუ არა ბილეთები სააგენტოს ოფიციალურ გამოცდას?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'დიახ, eTeoria იყენებს საქართველოს შსს მომსახურების სააგენტოს ოფიციალურ, უახლეს საგამოცდო ბაზას და სრულად შეესაბამება მოქმედ სტანდარტს.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

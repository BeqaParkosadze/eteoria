export const CATEGORIES = [
  { id: 'B_B1', name: 'B, B1', label: 'მსუბუქი ავტომობილი (Cars)', icon: 'Car', popular: true },
  { id: 'A_A1', name: 'A, A1', label: 'მოტოციკლი (Motorcycles)', icon: 'Bike' },
  { id: 'C', name: 'C', label: 'სატვირთო ავტომობილი (Heavy Trucks)', icon: 'Truck' },
  { id: 'C1', name: 'C1', label: 'სატვირთო ქვეკატეგორია (Medium Trucks)', icon: 'Truck' },
  { id: 'D', name: 'D', label: 'ავტობუსი (Buses)', icon: 'Bus' },
  { id: 'D1', name: 'D1', label: 'მიკროავტობუსი (Minibuses)', icon: 'Bus' },
  { id: 'TS', name: 'T, S', label: 'ტრაქტორი და სპეცტექნიკა (Tractors & Special)', icon: 'Wrench' },
  { id: 'Military', name: 'სამხედრო (Military)', label: 'სამხედრო მანქანები (Armed Forces)', icon: 'Shield' },
];

export const LANGUAGES = [
  { code: 'Geo', label: 'ქართული', short: 'GEO', flag: '🇬🇪' },
  { code: 'Abk', label: 'აფხაზური (Аԥсуа)', short: 'ABK', flag: '🇬🇪' },
  { code: 'Oss', label: 'ოსური (Ирон)', short: 'OSS', flag: '🇬🇪' },
  { code: 'Eng', label: 'English', short: 'ENG', flag: '🇬🇧' },
  { code: 'Rus', label: 'Русский', short: 'RUS', flag: '🌐' },
  { code: 'Aze', label: 'Azərbaycanca', short: 'AZE', flag: '🇦🇿' },
  { code: 'Arm', label: 'Հայერენ', short: 'ARM', flag: '🇦🇲' },
  { code: 'Turk', label: 'Türkçe', short: 'TUR', flag: '🇹🇷' },
];

export const EXAM_CONFIG = {
  TOTAL_QUESTIONS: 30,
  TIME_LIMIT_SECONDS: 30 * 60, // 30 minutes = 1800 seconds
  MAX_ALLOWED_MISTAKES: 3, // 4 mistakes = Fail
  PASSING_SCORE: 27, // 27/30 or more to pass
};

const ticketCache = new Map();

/**
 * Normalizes question object:
 * - Trims question text
 * - Sorts answers ascending by answerNumbering (1, 2, 3, 4)
 * - Trims each answer option text
 * - Ensures rightAnswer is an integer
 */
export const normalizeQuestion = (raw) => {
  const answers = (raw.answers || [])
    .map(a => ({
      answer: (a.answer || '').trim(),
      answerNumbering: Number(a.answerNumbering || 0)
    }))
    .sort((a, b) => a.answerNumbering - b.answerNumbering);

  return {
    id: raw.id,
    examTicketId: raw.examTicketId,
    imageId: raw.imageId,
    question: (raw.question || '').trim(),
    answers,
    rightAnswer: Number(raw.rightAnswer),
  };
};

/**
 * Fetches tickets for a specific category and language.
 */
export const fetchTickets = async (category = 'B_B1', language = 'Geo') => {
  const cacheKey = `${category}_${language}`;
  if (ticketCache.has(cacheKey)) {
    return ticketCache.get(cacheKey);
  }

  // Determine potential file URLs
  const candidateUrls = [];
  candidateUrls.push({ url: `/tickets/${category}_${language}.json`, isDirect: true });
  
  if (language === 'Oss') {
    candidateUrls.push({ url: `/tickets/${category}_Lang7.json`, isDirect: true });
  }

  // Graceful fallbacks
  if (language !== 'Geo') {
    candidateUrls.push({ 
      url: `/tickets/${category}_Geo.json`, 
      isFallback: true,
      notice: language === 'Abk' 
        ? 'აფხაზურ ენაზე ბილეთების თარგმანი მზადების პროცესშია. დროებით იტვირთება ქართული ბაზა 🇬🇪'
        : language === 'Oss'
        ? 'ოსურ ენაზე ბილეთების თარგმანი მზადების პროცესშია. დროებით იტვირთება ქართული ბაზა 🇬🇪'
        : `არჩეულ ენაზე ბილეთები მიუწვდომელია. იტვირთება ქართული ბაზა 🇬🇪`
    });
  }
  
  // Last resort English
  candidateUrls.push({ url: `/tickets/${category}_Eng.json`, isFallback: true, notice: 'Loaded English fallback tickets.' });

  for (const candidate of candidateUrls) {
    try {
      const response = await fetch(candidate.url);
      if (response.ok) {
        const rawData = await response.json();
        const normalized = rawData.map(normalizeQuestion);
        if (candidate.isFallback && candidate.notice) {
          normalized.fallbackNotice = candidate.notice;
        }
        ticketCache.set(cacheKey, normalized);
        return normalized;
      }
    } catch (e) {
      console.warn(`Could not load ${candidate.url}:`, e);
    }
  }

  throw new Error(`Failed to load tickets for category ${category}`);
};

/**
 * Fisher-Yates shuffle array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates an official 30-question exam subset
 */
export const generateExamQuestions = (allQuestions, count = 30) => {
  if (!allQuestions || allQuestions.length === 0) return [];
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Returns the public image URL for a given imageId
 */
export const getTicketImageUrl = (imageId) => {
  if (!imageId) return null;
  return `/images/${imageId}.jpg`;
};


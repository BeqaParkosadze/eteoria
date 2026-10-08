const STORAGE_KEYS = {
  HISTORY: 'drivepass_history_v1',
  MISTAKES: 'drivepass_mistakes_v1',
  SETTINGS: 'drivepass_settings_v1',
};

export const getExamHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load exam history', e);
    return [];
  }
};

export const saveExamAttempt = (attempt) => {
  try {
    const history = getExamHistory();
    const updated = [attempt, ...history];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save exam attempt', e);
    return [];
  }
};

export const clearExamHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.error('Failed to clear exam history', e);
  }
};

export const getMistakesBank = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load mistakes bank', e);
    return [];
  }
};

export const saveMistakesToBank = (newMistakes) => {
  try {
    const existing = getMistakesBank();
    const existingMap = new Map(existing.map(m => [m.id, m]));
    
    // Add or update
    for (const m of newMistakes) {
      existingMap.set(m.id, {
        ...m,
        savedAt: Date.now(),
        attemptsCount: (existingMap.get(m.id)?.attemptsCount || 0) + 1,
      });
    }

    const updated = Array.from(existingMap.values());
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save mistakes to bank', e);
    return [];
  }
};

export const removeMistakeFromBank = (questionId) => {
  try {
    const existing = getMistakesBank();
    const updated = existing.filter(m => m.id !== questionId);
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove mistake from bank', e);
    return [];
  }
};

export const clearMistakesBank = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.MISTAKES);
  } catch (e) {
    console.error('Failed to clear mistakes bank', e);
  }
};

export const getStoredSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { category: 'B_B1', language: 'Geo' };
  } catch (e) {
    return { category: 'B_B1', language: 'Geo' };
  }
};

export const saveStoredSettings = (settings) => {
  try {
    const current = getStoredSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const calculateStats = (history) => {
  if (!history || history.length === 0) {
    return {
      totalTests: 0,
      passRate: 0,
      avgTimePerQuestion: '0s',
      passedCount: 0,
      failedCount: 0,
      weakestCategories: [],
    };
  }

  const total = history.length;
  const passed = history.filter(h => h.passed).length;
  const passRate = Math.round((passed / total) * 100);

  // Time calculations
  let totalDurationSec = 0;
  let totalAnsweredQuestions = 0;

  // Category tracking
  const categoryStats = {};

  history.forEach(h => {
    totalDurationSec += h.durationSeconds || 0;
    const questionsCount = h.totalQuestions || 30;
    totalAnsweredQuestions += questionsCount;

    if (!categoryStats[h.category]) {
      categoryStats[h.category] = { totalAttempts: 0, passedAttempts: 0 };
    }
    categoryStats[h.category].totalAttempts += 1;
    if (h.passed) {
      categoryStats[h.category].passedAttempts += 1;
    }
  });

  const avgSecPerQuestion = totalAnsweredQuestions > 0 
    ? Math.round(totalDurationSec / totalAnsweredQuestions) 
    : 0;
  const avgTimePerQuestion = avgSecPerQuestion > 60 
    ? `${Math.floor(avgSecPerQuestion / 60)}m ${avgSecPerQuestion % 60}s` 
    : `${avgSecPerQuestion}s`;

  return {
    totalTests: total,
    passRate,
    avgTimePerQuestion,
    passedCount: passed,
    failedCount: total - passed,
    categoryStats,
  };
};

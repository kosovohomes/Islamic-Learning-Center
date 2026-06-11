export interface ArabicLetter {
  char: string;
  name: string;
  phonetic: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  exampleWord: string; // Arabic word
  exampleMeaning: string; // English meaning
}

export interface SurahVerse {
  number: number;
  text: string;
  translation: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  ayahs: SurahVerse[];
}

export interface Dua {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  benefit: string;
}

export interface QuizQuestion {
  id: number;
  difficulty: "Beginner" | "Intermediate" | "Scholar";
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SalahPose {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  recitationArabic: string;
  recitationTranslit: string;
  recitationEnglish: string;
}

export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface PrayerTime {
  name: string;
  time: string; // e.g., "04:30"
}

export interface Tasbih {
  id: string;
  phrase: string;
  arabic: string;
  translation: string;
  count: number;
  limit: number;
}

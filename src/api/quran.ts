import { SurahMeta } from "../types";

const BASE_URL = "https://api.ummahapi.com/v1";

export interface UmmahSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface UmmahVerse {
  number: number;
  text: string;
  translation?: string;
}

export interface UmmahSurahDetail {
  surah: UmmahSurah;
  verses: UmmahVerse[];
}

export interface UmmahSearchResult {
  surah: number;
  verse: number;
  text: string;
  translation?: string;
}

export async function fetchAllSurahs(): Promise<SurahMeta[]> {
  try {
    const res = await fetch(`${BASE_URL}/quran`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const surahs = json.data?.surahs || json.data || [];
    return surahs.map((s: any) => ({
      number: s.number,
      name: s.name || "",
      englishName: s.englishName || s.name_english || "",
      englishNameTranslation: s.englishNameTranslation || s.name_translation || "",
      numberOfAyahs: s.numberOfAyahs || s.verses_count || 0,
      revelationType: s.revelationType || "Meccan",
    }));
  } catch (err) {
    console.error("Failed to fetch surahs from UmmahAPI:", err);
    return [];
  }
}

export async function fetchSurahDetail(surahNumber: number): Promise<UmmahSurahDetail | null> {
  try {
    const res = await fetch(`${BASE_URL}/quran/surah/${surahNumber}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data || json;
    return {
      surah: data.surah || data,
      verses: data.verses || [],
    };
  } catch (err) {
    console.error(`Failed to fetch surah ${surahNumber}:`, err);
    return null;
  }
}

export async function searchQuran(query: string): Promise<UmmahSearchResult[]> {
  try {
    const res = await fetch(`${BASE_URL}/quran/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const results = json.data?.results || json.data || [];
    return results.map((r: any) => ({
      surah: r.surah || r.surah_number || 0,
      verse: r.verse || r.verse_number || 0,
      text: r.text || "",
      translation: r.translation || "",
    }));
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
}

export async function fetchTafsir(surahNumber: number, verseNumber?: number): Promise<string> {
  try {
    const url = verseNumber
      ? `${BASE_URL}/quran/tafsir/${surahNumber}/${verseNumber}`
      : `${BASE_URL}/quran/tafsir/${surahNumber}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data?.tafsir || json.data?.text || json.data || "";
  } catch (err) {
    console.error("Failed to fetch tafsir:", err);
    return "";
  }
}

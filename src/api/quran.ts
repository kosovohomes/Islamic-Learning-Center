import { SurahMeta } from "../types";

const BASE = "https://api.alquran.cloud/v1";

interface AlquranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface AlquranVerse {
  number: number;
  text: string;
  numberInSurah: number;
}

export async function fetchAllSurahs(): Promise<SurahMeta[]> {
  try {
    const res = await fetch(`${BASE}/surah`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return (json.data || []).map((s: AlquranSurah) => ({
      number: s.number,
      name: s.name,
      englishName: s.englishName,
      englishNameTranslation: s.englishNameTranslation,
      numberOfAyahs: s.numberOfAyahs,
      revelationType: s.revelationType as "Meccan" | "Medinan",
    }));
  } catch (err) {
    console.error("Failed to fetch surahs:", err);
    return [];
  }
}

export interface VerseDetail {
  number: number;
  numberInSurah: number;
  text: string;
}

export async function fetchSurahArabic(surahNumber: number): Promise<VerseDetail[]> {
  try {
    const res = await fetch(`${BASE}/surah/${surahNumber}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return (json.data?.ayahs || []).map((a: AlquranVerse) => ({
      number: a.numberInSurah,
      numberInSurah: a.numberInSurah,
      text: a.text,
    }));
  } catch (err) {
    console.error(`Failed to fetch Arabic surah ${surahNumber}:`, err);
    return [];
  }
}

export async function fetchSurahTranslation(surahNumber: number, edition = "en.sahih"): Promise<VerseDetail[]> {
  try {
    const res = await fetch(`${BASE}/surah/${surahNumber}/${edition}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return (json.data?.ayahs || []).map((a: AlquranVerse) => ({
      number: a.numberInSurah,
      numberInSurah: a.numberInSurah,
      text: a.text,
    }));
  } catch (err) {
    console.error(`Failed to fetch translation for surah ${surahNumber}:`, err);
    return [];
  }
}

export async function searchQuran(query: string): Promise<{ surah: number; verse: number; text: string }[]> {
  try {
    const res = await fetch(`${BASE}/search/${encodeURIComponent(query)}/all/en`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return (json.data?.matches || []).map((m: any) => ({
      surah: m.surah,
      verse: m.numberInSurah,
      text: m.text,
    }));
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
}

export async function fetchTafsir(surahNumber: number): Promise<string> {
  try {
    const res = await fetch(`${BASE}/surah/${surahNumber}/en.tafsir.muyassar`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data?.ayahs?.map((a: any) => a.text).join("\n\n") || "";
  } catch (err) {
    console.error("Failed to fetch tafsir:", err);
    return "";
  }
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchAllSurahs, fetchSurahArabic, fetchSurahTranslation, searchQuran, VerseDetail } from "../api/quran";
import { SurahMeta, Bookmark } from "../types";
import { Play, Pause, SkipBack, SkipForward, Bookmark as BookmarkIcon, BookmarkCheck, Volume2, Search, ChevronUp, Loader2 } from "lucide-react";

const FALLBACK_SURAH_LIST: SurahMeta[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqara", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Most Merciful", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" },
];

const AUDIO_BASE = "https://server8.mp3quran.net/afs/";

interface DisplayVerse {
  number: number;
  arabic: string;
  translation: string;
}

export default function QuranSection() {
  const [surahList, setSurahList] = useState<SurahMeta[]>(FALLBACK_SURAH_LIST);
  const [selectedSurah, setSelectedSurah] = useState<SurahMeta>(FALLBACK_SURAH_LIST[0]);
  const [verses, setVerses] = useState<DisplayVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [currentVerseHighlight, setCurrentVerseHighlight] = useState<number | null>(null);
  const [showTafsir, setShowTafsir] = useState(false);
  const [tafsirText, setTafsirText] = useState("");
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [verseTimings, setVerseTimings] = useState<{ verse: number; time: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const readingAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllSurahs().then((s) => {
      if (s.length > 0) setSurahList(s);
    });
    try {
      const saved = localStorage.getItem("islamic_learning_quran_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {}
  }, []);

  const loadSurah = useCallback(async (surah: SurahMeta) => {
    setSelectedSurah(surah);
    setLoading(true);
    setVerses([]);
    setCurrentVerseHighlight(null);

    const [arabic, translation] = await Promise.all([
      fetchSurahArabic(surah.number),
      fetchSurahTranslation(surah.number),
    ]);

    const merged: DisplayVerse[] = arabic.map((a) => {
      const t = translation.find((x) => x.numberInSurah === a.numberInSurah);
      return { number: a.numberInSurah, arabic: a.text, translation: t?.text || "" };
    });
    setVerses(merged);
    setLoading(false);

    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
      const padded = String(surah.number).padStart(3, "0");
      audioRef.current.src = `${AUDIO_BASE}${padded}.mp3`;
      audioRef.current.load();
    }
  }, []);

  useEffect(() => {
    loadSurah(FALLBACK_SURAH_LIST[0]);
  }, []);

  useEffect(() => {
    if (verses.length > 0 && audioDuration > 0) {
      const totalWords = verses.reduce((acc, v) => acc + (v.arabic.split(/\s+/).length || 10), 0);
      let cum = 0;
      setVerseTimings(verses.map((v) => {
        const words = v.arabic.split(/\s+/).length || 10;
        const t = cum;
        cum += words;
        return { verse: v.number, time: (t / totalWords) * audioDuration };
      }));
    }
  }, [verses, audioDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      const t = audio.currentTime;
      setAudioTime(t);
      setAudioDuration(audio.duration || 0);
      const cur = [...verseTimings].reverse().find((vt) => t >= vt.time);
      if (cur) {
        setCurrentVerseHighlight(cur.verse);
        const el = readingAreaRef.current?.querySelector(`[data-verse="${cur.verse}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [verseTimings]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
    setAudioPlaying(!audioPlaying);
  };

  const playVerse = (verseNumber: number) => {
    const timing = verseTimings.find((vt) => vt.verse === verseNumber);
    if (timing && audioRef.current) {
      audioRef.current.currentTime = timing.time;
      if (!audioPlaying) { audioRef.current.play().catch(() => {}); setAudioPlaying(true); }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setAudioTime(t);
  };

  const loadTafsir = async () => {
    setTafsirLoading(true);
    setShowTafsir(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/en.sahih`);
      const json = await res.json();
      const ayahs = json.data?.ayahs || [];
      const text = ayahs.map((a: any) => `${a.numberInSurah}. ${a.text}`).join("\n\n");
      setTafsirText(text || "Translation not available for this surah.");
    } catch {
      setTafsirText("Failed to load translation.");
    }
    setTafsirLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const results = await searchQuran(searchQuery);
    setSearchResults(results);
  };

  const toggleBookmark = (verseNumber: number) => {
    const exists = bookmarks.find((b) => b.surahNumber === selectedSurah.number && b.verseNumber === verseNumber);
    const updated = exists
      ? bookmarks.filter((b) => !(b.surahNumber === selectedSurah.number && b.verseNumber === verseNumber))
      : [...bookmarks, { surahNumber: selectedSurah.number, verseNumber, surahName: selectedSurah.englishName, timestamp: new Date().toISOString() }];
    setBookmarks(updated);
    localStorage.setItem("islamic_learning_quran_bookmarks", JSON.stringify(updated));
  };

  const textClass = fontSize === "sm" ? "text-lg" : fontSize === "md" ? "text-xl" : "text-2xl";
  const transClass = fontSize === "sm" ? "text-xs" : fontSize === "md" ? "text-sm" : "text-base";
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="flex flex-col lg:flex-row gap-4" style={{ height: "calc(100vh - 200px)" }}>
      <audio ref={audioRef} onEnded={() => setAudioPlaying(false)} />

      {/* Sidebar */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3 overflow-hidden">
        {/* Search */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search surahs or verses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 text-xs bg-transparent outline-none" />
          </div>
        </div>

        {/* Surah List */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex-1 overflow-y-auto space-y-1">
          {surahList.map((s) => (
            <button key={s.number} onClick={() => loadSurah(s)} className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between ${selectedSurah.number === s.number ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : "hover:bg-slate-50 text-slate-700"}`}>
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-100 text-[9px] font-mono font-bold flex items-center justify-center">{s.number}</span>
                <span className="truncate">{s.englishName}</span>
              </span>
              <span className="text-[9px] text-slate-400">{s.numberOfAyahs}Ay</span>
            </button>
          ))}
        </div>

        {/* Audio Player */}
        <div className="bg-gradient-to-b from-emerald-950 to-slate-900 rounded-2xl p-4 text-white shadow-xl shrink-0">
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Mishary Alafasy</p>
          <h3 className="text-sm font-semibold text-emerald-100 mb-2">{selectedSurah.englishName}</h3>
          <input type="range" min={0} max={audioDuration || 100} value={audioTime} onChange={handleSeek} className="w-full accent-emerald-500 h-1 rounded cursor-pointer" />
          <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
            <span>{formatTime(audioTime)}</span><span>{formatTime(audioDuration)}</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); }} className="text-slate-400 hover:text-white cursor-pointer"><SkipBack className="w-4 h-4" /></button>
            <button onClick={toggleAudio} className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center cursor-pointer active:scale-95">
              {audioPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />}
            </button>
            <button onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(audioDuration, audioRef.current.currentTime + 10); }} className="text-slate-400 hover:text-white cursor-pointer"><SkipForward className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-emerald-950">{selectedSurah.englishName}</h2>
            <p className="text-[11px] text-slate-400">{selectedSurah.englishNameTranslation} · {selectedSurah.numberOfAyahs} Ayahs · {selectedSurah.revelationType}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadTafsir} className={`text-[10px] px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${showTafsir ? "bg-amber-100 border border-amber-200 text-amber-800" : "bg-amber-50 border border-amber-100 text-amber-700 hover:bg-amber-100"}`}>
              Tafsir
            </button>
            <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-200">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button key={s} onClick={() => setFontSize(s)} className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${fontSize === s ? "bg-white shadow text-emerald-950" : "text-slate-400"}`}>
                  {s === "sm" ? "A-" : s === "md" ? "A" : "A+"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tafsir Panel */}
        {showTafsir && (
          <div className="mx-4 mt-3 rounded-xl p-4" style={{ background: "linear-gradient(135deg, rgba(255,251,235,0.8), rgba(254,243,199,0.6))", border: "1px solid rgba(217,119,6,0.15)" }}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">English Translation (Sahih International)</h4>
              <button onClick={() => setShowTafsir(false)} className="text-amber-600 hover:text-amber-800 cursor-pointer text-xs">Close</button>
            </div>
            {tafsirLoading ? (
              <div className="flex items-center gap-2 text-amber-700"><Loader2 className="w-4 h-4 animate-spin" /><span className="text-xs">Loading...</span></div>
            ) : (
              <p className="text-[13px] text-amber-900 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Amiri', serif" }}>{tafsirText}</p>
            )}
          </div>
        )}

        {/* Verses */}
        <div ref={readingAreaRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
            <div className="text-center mb-6 pb-4 border-b border-dashed border-slate-200">
              <p className="text-2xl text-emerald-900 leading-loose" dir="rtl" style={{ fontFamily: "'Amiri', serif" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="text-[10px] text-slate-400 mt-1">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
            </div>
          )}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
              <span className="text-xs font-mono">Loading verses...</span>
            </div>
          ) : verses.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-xs">No verses loaded.</div>
          ) : (
            verses.map((v) => (
              <div key={v.number} data-verse={v.number} className={`p-4 rounded-xl transition-all duration-300 border ${currentVerseHighlight === v.number ? "bg-emerald-50 border-emerald-200 shadow-sm" : "border-transparent hover:bg-slate-50"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold flex items-center justify-center text-slate-500">{v.number}</span>
                    <button onClick={() => playVerse(v.number)} className="p-1 rounded text-slate-400 hover:text-emerald-600 cursor-pointer" title="Play from here"><Volume2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => toggleBookmark(v.number)} className={`p-1 rounded cursor-pointer ${bookmarks.find((b) => b.surahNumber === selectedSurah.number && b.verseNumber === v.number) ? "text-amber-500" : "text-slate-300 hover:text-slate-500"}`}>
                      {bookmarks.find((b) => b.surahNumber === selectedSurah.number && b.verseNumber === v.number) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkIcon className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex-1 text-right">
                    <p className={`${textClass} text-slate-900 leading-loose select-all`} dir="rtl" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>{v.arabic}</p>
                  </div>
                </div>
                {v.translation && <p className={`${transClass} text-slate-500 mt-2 pl-12`}>{v.translation}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

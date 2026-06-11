import React, { useState, useEffect, useRef } from "react";
import { SURAHS } from "../data";
import { Surah, SurahVerse } from "../types";
import { Play, Pause, Bookmark, BookmarkCheck, Volume2, Type, RefreshCw, Layers } from "lucide-react";

export default function QuranSection() {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [bookmarks, setBookmarks] = useState<string[]>([]); // Array of "surahNumber-verseNumber"
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSurah = SURAHS.find((s) => s.number === selectedSurahNumber) || SURAHS[0];

  // Load Bookmarks from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("islamic_learning_quran_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load bookmarks", e);
    }
  }, []);

  // Sync bookmarks with localStorage
  const toggleBookmark = (surahNum: number, verseNum: number) => {
    const key = `${surahNum}-${verseNum}`;
    let updated: string[];
    if (bookmarks.includes(key)) {
      updated = bookmarks.filter((b) => b !== key);
    } else {
      updated = [...bookmarks, key];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem("islamic_learning_quran_bookmarks", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save bookmark", e);
    }
  };

  // Helper to format the audio URL with 3-digit zero-padding
  const getAudioUrl = (surahNum: number) => {
    const padded = String(surahNum).padStart(3, "0");
    return `https://download.quranicaudio.com/quran/mishari_alaafasy/${padded}.mp3`;
  };

  // Safe wrapper for audio source change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = getAudioUrl(selectedSurahNumber);
      audioRef.current.load();
    }
  }, [selectedSurahNumber]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.error("Audio playback error:", e);
          setIsPlaying(false);
        });
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = parseFloat(e.target.value);
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div id="quran-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Invisible Audio Element */}
      <audio
        ref={audioRef}
        src={getAudioUrl(selectedSurahNumber)}
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Surah List & Custom Audio Desk */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Surah Selector Desk */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col">
          <span className="text-xs font-mono text-slate-400 font-medium mb-3 uppercase tracking-wider">Select Holy Surah</span>
          <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
            {SURAHS.map((surah) => {
              const isActive = surah.number === selectedSurahNumber;
              return (
                <button
                  key={surah.number}
                  onClick={() => setSelectedSurahNumber(surah.number)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950 font-medium"
                      : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center font-mono ${
                      isActive ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {surah.number}
                    </span>
                    <div>
                      <h4 className="text-sm tracking-tight">{surah.englishName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono italic">{surah.englishNameTranslation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase px-2 py-0.5 bg-slate-100 border border-slate-200/50 rounded">
                      {surah.revelationType}
                    </span>
                    <p className="text-[11px] text-slate-400 block mt-0.5">{surah.numberOfAyahs} Ayahs</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calligraphic Audio Audio Player Desk */}
        <div className="bg-gradient-to-b from-emerald-950 to-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
          
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">Mishary Alafasy Recitation</span>
            <h3 className="text-lg font-sans font-semibold tracking-tight mt-0.5 text-emerald-100">
              Surah {activeSurah.englishName}
            </h3>
            <p className="text-xs text-slate-400 italic">Streaming Audio recitation of the full Surah</p>
          </div>

          {/* Time slider */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer appearance-none"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play pauses button and display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-[11px] font-mono text-slate-300">
                {isPlaying ? "Reciting..." : "Paused"}
              </span>
            </div>
            
            <button
              onClick={handlePlayPause}
              className="w-11 h-11 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-lg active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Quran Scroll Board */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col min-h-[500px]">
        {/* Top bar with tools */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-sans text-emerald-950">{activeSurah.englishName}</span>
            <span className="text-sm text-slate-400">({activeSurah.englishNameTranslation})</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Font size adjustments */}
            <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
              <button
                onClick={() => setFontSize("sm")}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${fontSize === "sm" ? "bg-white text-emerald-950 shadow-xs" : "text-slate-400"}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("md")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${fontSize === "md" ? "bg-white text-emerald-950 shadow-xs" : "text-slate-400"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${fontSize === "lg" ? "bg-white text-emerald-950 shadow-xs" : "text-slate-400"}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable list of verses */}
        <div className="flex-1 space-y-6 max-h-[540px] overflow-y-auto pr-1">
          {/* Audio warning info */}
          <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
            <Layers className="w-4 h-4 shrink-0" />
            <span>Select any Ayah's star to bookmark it. Recitations automatically play the whole selected Surah continuously.</span>
          </div>

          {activeSurah.ayahs.map((ayah) => {
            const isBookmarked = bookmarks.includes(`${activeSurah.number}-${ayah.number}`);
            
            // Adjust sizes according to user selection
            const textClass =
              fontSize === "sm"
                ? "text-xl"
                : fontSize === "md"
                ? "text-2xl"
                : "text-3xl";

            const translationClass =
              fontSize === "sm"
                ? "text-xs"
                : fontSize === "md"
                ? "text-sm"
                : "text-base";

            return (
              <div
                key={ayah.number}
                className="group relative border-b border-dashed border-slate-150 pb-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  {/* Metadata and Bookmark */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold flex items-center justify-center text-slate-500">
                      {ayah.number}
                    </span>
                    <button
                      onClick={() => toggleBookmark(activeSurah.number, ayah.number)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                        isBookmarked
                          ? "bg-amber-50 border-amber-200 text-amber-500"
                          : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Calligraphy Verse Text */}
                  <div className="flex-1 text-right">
                    <p className={`${textClass} leading-loose font-sans font-bold text-slate-900 tracking-wide select-all`} dir="rtl">
                      {ayah.text}
                    </p>
                  </div>
                </div>

                {/* English translation block */}
                <div className="pl-9 pr-4 md:pr-10 mt-2">
                  <p className={`${translationClass} leading-relaxed text-slate-600 tracking-tight font-sans`}>
                    {ayah.translation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

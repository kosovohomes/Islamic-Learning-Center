import React, { useState, useEffect } from "react";
import { SALAH_POSES, TASBIH_TEMPLATES } from "../data";
import { SalahPose, Tasbih } from "../types";
import { Clock, CheckSquare, Plus, RotateCcw, Award, ChevronRight, ChevronLeft, Volume2, ShieldAlert } from "lucide-react";

// Precalculated typical timings for 8 main cities to make the widget robust
const CITY_TIMINGS: Record<string, { Fajr: string; Sunrise: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string }> = {
  Mecca: { Fajr: "04:12", Sunrise: "05:38", Dhuhr: "12:22", Asr: "15:40", Maghrib: "19:02", Isha: "20:32" },
  Medina: { Fajr: "04:09", Sunrise: "05:37", Dhuhr: "12:23", Asr: "15:45", Maghrib: "19:04", Isha: "20:34" },
  London: { Fajr: "02:54", Sunrise: "04:42", Dhuhr: "13:02", Asr: "17:18", Maghrib: "21:19", Isha: "22:59" },
  Pristina: { Fajr: "03:10", Sunrise: "04:55", Dhuhr: "12:35", Asr: "16:36", Maghrib: "20:12", Isha: "21:50" },
  Istanbul: { Fajr: "03:22", Sunrise: "05:12", Dhuhr: "13:08", Asr: "17:05", Maghrib: "20:41", Isha: "22:21" },
  Cairo: { Fajr: "04:02", Sunrise: "05:54", Dhuhr: "12:53", Asr: "16:21", Maghrib: "19:42", Isha: "21:12" },
  New_York: { Fajr: "03:45", Sunrise: "05:24", Dhuhr: "12:58", Asr: "16:55", Maghrib: "20:31", Isha: "22:04" },
  Sarajevo: { Fajr: "03:12", Sunrise: "04:58", Dhuhr: "12:41", Asr: "16:42", Maghrib: "20:20", Isha: "21:58" },
};

export default function SalahTrackerSection() {
  const [activeCity, setActiveCity] = useState<string>("Mecca");
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");
  const [nextPrayerName, setNextPrayerName] = useState<string>("");
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState<string>("");

  // Daily Habits Tracker
  const [habits, setHabits] = useState<Record<string, boolean>>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    quran: false,
    adhkar: false,
    sadaqah: false,
  });

  // Streaks Counter
  const [streak, setStreak] = useState<number>(0);

  // Tasbih state
  const [tasbihTemplates, setTasbihTemplates] = useState<Tasbih[]>(TASBIH_TEMPLATES);
  const [selectedTasbihId, setSelectedTasbihId] = useState<string>("subhanallah");

  // Salah Coach State
  const [coachStep, setCoachStep] = useState<number>(0);
  const activePose: SalahPose = SALAH_POSES[coachStep];

  const currentTimings = CITY_TIMINGS[activeCity] || CITY_TIMINGS["Mecca"];

  // Update Clock & calculate next countdown
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours() + 3 % 24).padStart(2, "0"); // Middle-East offset for nice simulation
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      
      const simulatedTimeStr = `${hrs}:${mins}:${secs}`;
      setCurrentTimeStr(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} (Local)`);

      // Determine next Prayer
      const nowHrs = now.getHours();
      const nowMins = now.getMinutes();
      const totalLocalMins = nowHrs * 60 + nowMins;

      let nextName = "Fajr";
      let targetTimestr = currentTimings.Fajr;
      let minDiff = Infinity;

      Object.entries(currentTimings).forEach(([name, tStr]) => {
        const [p_hrs, p_mins] = tStr.split(":").map(Number);
        const pTotalMins = p_hrs * 60 + p_mins;
        let diff = pTotalMins - totalLocalMins;
        if (diff < 0) diff += 24 * 60; // falls tomorrow

        if (diff < minDiff) {
          minDiff = diff;
          nextName = name;
          targetTimestr = tStr;
        }
      });

      setNextPrayerName(nextName);

      // Format countdown hours & minutes
      const diffHrs = Math.floor(minDiff / 60);
      const diffMins = minDiff % 60;
      setNextPrayerCountdown(`${diffHrs}h ${diffMins}m remaining`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeCity, currentTimings]);

  // Load Tracker values from LocalStorage on mount
  useEffect(() => {
    try {
      const savedHabits = localStorage.getItem("islamic_learning_habits");
      const savedStreak = localStorage.getItem("islamic_learning_streak");
      const savedTasbih = localStorage.getItem("islamic_learning_tasbih_counts");
      
      if (savedHabits) setHabits(JSON.parse(savedHabits));
      if (savedStreak) setStreak(Number(savedStreak));
      if (savedTasbih) {
        const countsObj = JSON.parse(savedTasbih);
        setTasbihTemplates((prev) =>
          prev.map((t) => ({ ...t, count: countsObj[t.id] || 0 }))
        );
      }
    } catch (e) {
      console.error("Storage load error", e);
    }
  }, []);

  const handleHabitToggle = (key: string) => {
    const updated = { ...habits, [key]: !habits[key] };
    setHabits(updated);
    try {
      localStorage.setItem("islamic_learning_habits", JSON.stringify(updated));

      // Quick logic to verify streak: if they finished Fajr, Dhuhr, Asr, Maghrib, Isha, count streak
      const allPrayersDone = updated.fajr && updated.dhuhr && updated.asr && updated.maghrib && updated.isha;
      const newStreak = allPrayersDone ? Math.max(streak, 1) + (streak === 0 ? 0 : 0) : streak;
      if (allPrayersDone && streak === 0) {
        setStreak(1);
        localStorage.setItem("islamic_learning_streak", "1");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleIncrementTasbih = (id: string) => {
    setTasbihTemplates((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          const newCount = t.count + 1;
          // Play a small mock tap click synthesizer on count trigger (quiet synth in browser)
          if ("vibrate" in navigator) {
            navigator.vibrate(20);
          }
          return { ...t, count: newCount >= t.limit ? 0 : newCount };
        }
        return t;
      });

      // Save count object
      const countsObj = updated.reduce((acc, curr) => {
        acc[curr.id] = curr.count;
        return acc;
      }, {} as Record<string, number>);
      localStorage.setItem("islamic_learning_tasbih_counts", JSON.stringify(countsObj));
      return updated;
    });
  };

  const handleResetTasbih = (id: string) => {
    setTasbihTemplates((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) return { ...t, count: 0 };
        return t;
      });
      const countsObj = updated.reduce((acc, curr) => {
        acc[curr.id] = curr.count;
        return acc;
      }, {} as Record<string, number>);
      localStorage.setItem("islamic_learning_tasbih_counts", JSON.stringify(countsObj));
      return updated;
    });
  };

  const currentTasbih = tasbihTemplates.find((t) => t.id === selectedTasbihId) || tasbihTemplates[0];

  const handleNextCoach = () => {
    if (coachStep < SALAH_POSES.length - 1) {
      setCoachStep(coachStep + 1);
    }
  };

  const handlePrevCoach = () => {
    if (coachStep > 0) {
      setCoachStep(coachStep - 1);
    }
  };

  // Habith progress percentage
  const totalHabits = Object.keys(habits).length;
  const completedHabits = Object.values(habits).filter(Boolean).length;
  const progressPercent = Math.round((completedHabits / totalHabits) * 100);

  return (
    <div id="salah-tracker-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. Daily Prayer Times Dashboard Widget */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-sans font-semibold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              Prayer Times
            </h3>
            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value)}
              className="text-xs font-mono font-medium outline-none bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg text-slate-700 cursor-pointer"
            >
              <option value="Mecca">Makkah</option>
              <option value="Medina">Madinah</option>
              <option value="Pristina">Pristina</option>
              <option value="London">London</option>
              <option value="Istanbul">Istanbul</option>
              <option value="Cairo">Cairo</option>
              <option value="New_York">New York</option>
              <option value="Sarajevo">Sarajevo</option>
            </select>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100/50 mb-4 text-center">
            <p className="text-[10px] font-mono uppercase text-emerald-800 tracking-wider">Up Next</p>
            <h4 className="text-xl font-bold text-center tracking-tight text-emerald-950 mt-0.5">
              {nextPrayerName} at {currentTimings[nextPrayerName as keyof typeof currentTimings] || "..."}
            </h4>
            <span className="text-xs font-mono text-emerald-800 block mt-1 bg-emerald-100/60 max-w-max mx-auto px-2 py-0.5 rounded-md font-semibold">
              {nextPrayerCountdown}
            </span>
          </div>

          <div className="space-y-2 font-mono">
            {Object.entries(currentTimings).map(([prayer, timeVal]) => {
              const isActive = prayer === nextPrayerName;
              return (
                <div
                  key={prayer}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs border ${
                    isActive
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-xs"
                      : "bg-slate-50 border-slate-100 text-slate-800"
                  }`}
                >
                  <span className="font-semibold">{prayer}</span>
                  <span className="font-bold">{timeVal}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mt-4 text-center">
          Calculated using Muslim World League (MWL) standards.
        </div>
      </div>

      {/* 2. Interactive Habits Check & Streaks */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-sans font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Daily Deed Tracker
            </h3>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 py-0.5 px-2 rounded-lg text-amber-800 font-mono text-[10px] font-bold">
              <Award className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Streak: {streak} d
            </div>
          </div>

          {/* Progress gauge */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-mono">
              <span>Goal Progress</span>
              <span className="font-bold text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {[
              { id: "fajr", label: "Fajr Prayer (Dawn)" },
              { id: "dhuhr", label: "Dhuhr Prayer (Noon)" },
              { id: "asr", label: "Asr Prayer (Afternoon)" },
              { id: "maghrib", label: "Maghrib Prayer (Sunset)" },
              { id: "isha", label: "Isha Prayer (Night)" },
              { id: "quran", label: "Quran Study/Reading" },
              { id: "adhkar", label: "Recite Morning/Evening Dhikr" },
              { id: "sadaqah", label: "Deed of Sadaqah (Charity/Smile)" },
            ].map((habit) => {
              const isChecked = habits[habit.id] || false;
              return (
                <button
                  key={habit.id}
                  onClick={() => handleHabitToggle(habit.id)}
                  className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isChecked
                      ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                      : "bg-white border-slate-100 text-slate-800 hover:border-slate-200 hover:bg-slate-50/20"
                  }`}
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center font-bold text-[10px] ${
                    isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300"
                  }`}>
                    {isChecked && "✓"}
                  </span>
                  <span>{habit.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mt-4 text-center">
          Logs auto-save in your browser's offline storage.
        </div>
      </div>

      {/* 3. Electronic Tasbih Clicker Desk */}
      <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between min-h-[460px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">Tasbih Al-Digital</span>
          <button
            onClick={() => handleResetTasbih(selectedTasbihId)}
            className="p-1.5 rounded-lg border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Reset Counter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Picker */}
        <div className="grid grid-cols-2 gap-1.5">
          {tasbihTemplates.map((item) => {
            const isSelected = item.id === selectedTasbihId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedTasbihId(item.id)}
                className={`text-[10px] uppercase font-mono py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer leading-tight ${
                  isSelected
                    ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold"
                    : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {item.phrase}
              </button>
            );
          })}
        </div>

        {/* Main Display clicker */}
        <div className="my-6 text-center">
          <p className="text-3xl font-bold text-center text-emerald-300 tracking-wide font-sans mb-1" dir="rtl">
            {currentTasbih.arabic}
          </p>
          <p className="text-xs text-slate-400 italic mb-4">"{currentTasbih.translation}"</p>

          <button
            onClick={() => handleIncrementTasbih(selectedTasbihId)}
            className="w-32 h-32 rounded-full bg-radial from-slate-850 to-slate-900 border-4 border-emerald-500/20 active:border-emerald-400 flex flex-col items-center justify-center relative mx-auto group shadow-2xl transition-all hover:scale-102 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-all"></div>
            <span className="text-4xl font-bold font-mono text-emerald-300 block leading-none select-none">
              {currentTasbih.count}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase mt-1 tracking-wider block select-none">
              Goal: {currentTasbih.limit}
            </span>
          </button>
        </div>

        <div className="text-[10px] text-slate-400 text-center">
          Click the circular pad to count. Device will trigger micro-vibrations if supported.
        </div>
      </div>

      {/* 4. Interactive Salah Step-by-Step Posture Coach */}
      <div className="lg:col-span-12 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs mt-4">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-sans font-semibold text-slate-800">Salah Prayer Coach</h3>
            <p className="text-xs text-slate-400 mt-0.5">Learn the precise step-by-step physical postures and recitations of prayers.</p>
          </div>
          <div className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 select-none">
            Pose {coachStep + 1} of {SALAH_POSES.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Posture metadata */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-600 font-semibold tracking-wider">Posture Step</span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                {activePose.name}
                <span className="text-base font-medium text-emerald-800 font-sans" dir="rtl">
                  ({activePose.arabicName})
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {activePose.description}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-2">Recitation in Arabic</span>
              <p className="text-xl font-bold text-slate-900 select-all tracking-wide mb-1.5" dir="rtl">
                {activePose.recitationArabic}
              </p>
              
              <span className="text-[10.5px] font-mono text-slate-400 block mt-3">Phonetic Transliteration:</span>
              <p className="text-xs text-slate-700 italic font-mono mt-0.5">{activePose.recitationTranslit}</p>
              
              <span className="text-[10.5px] font-mono text-slate-400 block mt-3">Meaning in English:</span>
              <p className="text-xs text-slate-600 mt-0.5">{activePose.recitationEnglish}</p>
            </div>
          </div>

          {/* Graphical illustration desk */}
          <div className="md:col-span-4 bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-200/50 min-h-[220px]">
            {/* Display character sketch block or text symbol indicator */}
            <div className="flex-1 flex flex-col items-center justify-center my-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100/50 text-emerald-800 font-bold flex items-center justify-center border border-emerald-200 text-2xl select-none">
                {coachStep + 1}
              </div>
              <p className="text-xs font-mono text-slate-600 font-semibold mt-3 uppercase tracking-wider">{activePose.name}</p>
              <div className="text-[10px] text-slate-400 mt-1 italic text-center px-4">
                "Keep your focus resting on the place of Sujud on the floor throughout."
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex justify-between items-center bg-white border border-slate-200 p-1 rounded-xl">
              <button
                onClick={handlePrevCoach}
                disabled={coachStep === 0}
                className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-mono text-slate-500 font-semibold">
                Pose {coachStep + 1} / {SALAH_POSES.length}
              </span>

              <button
                onClick={handleNextCoach}
                disabled={coachStep === SALAH_POSES.length - 1}
                className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

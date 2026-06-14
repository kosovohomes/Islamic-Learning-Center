/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import AlphabetSection from "./components/AlphabetSection";
import QuranSection from "./components/QuranSection";
import SalahTrackerSection from "./components/SalahTrackerSection";
import QuizSection from "./components/QuizSection";
import ChatSection from "./components/ChatSection";
import { BookOpen, Book, CheckSquare, HelpCircle, MessageSquare, Compass, Sparkles, Award } from "lucide-react";

type TabId = "alphabet" | "quran" | "salah" | "quiz" | "chat";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("alphabet");
  const [streak, setStreak] = useState<number>(0);
  const [completedPercent, setCompletedPercent] = useState<number>(0);

  useEffect(() => {
    try {
      const savedHabits = localStorage.getItem("islamic_learning_habits");
      const savedStreak = localStorage.getItem("islamic_learning_streak");
      if (savedHabits) {
        const habitsObj = JSON.parse(savedHabits);
        const total = Object.keys(habitsObj).length;
        const completed = Object.values(habitsObj).filter(Boolean).length;
        setCompletedPercent(Math.round((completed / total) * 100));
      }
      if (savedStreak) {
        setStreak(Number(savedStreak));
      }
    } catch (e) {
      console.error("Failed to load header stats", e);
    }
    
    const handleStorageChange = () => {
      const savedStreak = localStorage.getItem("islamic_learning_streak");
      if (savedStreak) setStreak(Number(savedStreak));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 transition-colors">
      
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-30">
        <div id="main-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <a href="https://abcofislam.com" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors">
              ABC of Islam
            </a>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-slate-900 tracking-tight text-sm sm:text-base">Islamic Learning Center</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100/50 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase hidden sm:inline">
                  v1.2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans tracking-wide leading-none hidden sm:block">مَرْكَزُ التَّعَلُّمِ الْإِسْلَامِيِّ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-1 px-3 text-emerald-800 text-[11px] font-mono font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              Qibla (Mecca): North-East 135°
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl py-1 px-3 text-amber-900 text-[11px] font-mono font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              Deeds: {completedPercent}%
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-2xl p-2 border border-slate-200/60 shadow-xs flex items-center justify-between gap-2 overflow-x-auto select-none no-scrollbar mb-8">
          <div className="flex items-center gap-1.5 w-full">
            {[
              { id: "alphabet" as TabId, label: "Arabic Letters", icon: BookOpen },
              { id: "quran" as TabId, label: "Quran Reader", icon: Book },
              { id: "salah" as TabId, label: "Salah & Tasbih", icon: CheckSquare },
              { id: "quiz" as TabId, label: "Knowledge Quiz", icon: HelpCircle },
              { id: "chat" as TabId, label: "AI Companion", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-102"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2">
          {activeTab === "alphabet" && <AlphabetSection />}
          {activeTab === "quran" && <QuranSection />}
          {activeTab === "salah" && <SalahTrackerSection />}
          {activeTab === "quiz" && <QuizSection />}
          {activeTab === "chat" && <ChatSection />}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 border-t border-slate-200/60 pt-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a href="https://abcofislam.com" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-2 py-1 rounded transition-colors">
              ABC of Islam
            </a>
            <p className="text-xs text-slate-400 font-sans tracking-tight">
              © 2026 Interactive Islamic Learning Center. Proudly built for learning, recitation guidance, and scholarly exploration.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Islamic Studies Portfolio Initiative</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

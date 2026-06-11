import React, { useState } from "react";
import { ARABIC_LETTERS } from "../data";
import { ArabicLetter } from "../types";
import { Volume2, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AlphabetSection() {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_LETTERS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const handleSpeak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setFeedback("Audio synthesis not supported in this browser.");
      return;
    }
    
    // Stop prior sounds
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Explicitly request Arabic voice
    utterance.lang = "ar-SA";
    utterance.rate = 0.85; // slightly slower for clear learning
    
    // Find an Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find((v) => v.lang.startsWith("ar"));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setIsPlaying(false);
      // Fallback fallback phonetic message
      setFeedback("Vocal synthesis was blocked or not supported on this device. Phonetic: " + selectedLetter.phonetic);
      setTimeout(() => setFeedback(""), 4000);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id="alphabet-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Intro Header */}
      <div className="lg:col-span-12 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-semibold text-emerald-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Arabic Alphabet Coach
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Master the 28 core letters of the Arabic language, their writing forms (Isolated, Initial, Medial, Final), and listen to authentic spoken examples.
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-lg border border-emerald-100 font-medium flex items-center gap-1.5 self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Vocal Trainer Active
        </div>
      </div>

      {/* Grid of Letters */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col">
        <span className="text-xs font-mono text-slate-400 font-medium mb-4 uppercase tracking-wider">Select a Letter to Study</span>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
          {ARABIC_LETTERS.map((item, index) => {
            const isSelected = selectedLetter.char === item.char;
            return (
              <button
                key={item.char}
                onClick={() => {
                  setSelectedLetter(item);
                  setFeedback("");
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all relative group cursor-pointer ${
                  isSelected
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10 scale-102"
                    : "bg-slate-50 border-slate-100 text-slate-800 hover:bg-slate-100/70 hover:border-slate-200"
                }`}
              >
                <span className="text-2xl font-semibold mb-0.5 leading-none font-sans">{item.char}</span>
                <span className={`text-[10px] uppercase font-mono tracking-wider ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                  {item.name}
                </span>
                <span className="absolute top-1 right-1 text-[8px] font-mono text-slate-300 group-hover:block hidden">
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Pronunciation Card */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="bg-gradient-to-b from-emerald-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col flex-1 min-h-[400px]">
          {/* Ambient graphic background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-6 -mt-6"></div>
          
          <div className="flex items-center justify-between mb-6 z-10">
            <span className="text-xs font-mono uppercase text-emerald-300 tracking-wider">Pronunciation Unit</span>
            <div className="bg-emerald-900/40 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">
              Unicode {selectedLetter.char.charCodeAt(0)}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6 z-10">
            {/* Massive Display character */}
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative">
              <span className="text-5xl font-sans font-bold text-emerald-100 select-none">
                {selectedLetter.char}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-sans font-semibold tracking-tight text-white flex items-center gap-2">
                {selectedLetter.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Phonetic: <span className="text-emerald-300 underline font-semibold">/{selectedLetter.phonetic}/</span>
              </p>
              
              {/* Speak Trigger Button */}
              <button
                onClick={() => handleSpeak(selectedLetter.exampleWord)}
                disabled={isPlaying}
                className="mt-3 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-4 py-2 rounded-xl text-xs transition-all tracking-tight cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                {isPlaying ? "Speaking..." : "Listen & Practice"}
              </button>
            </div>
          </div>

          {/* Graphical Forms of Letter */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 z-10">
            <h4 className="text-[11px] font-mono uppercase text-emerald-300 tracking-wider mb-3">Writing Context Shapes</h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-slate-800/50 rounded border border-white/5">
                <div className="text-lg font-semibold h-7 flex items-center justify-center text-white">{selectedLetter.isolated}</div>
                <div className="text-[9px] font-mono text-slate-400">Isolated</div>
              </div>
              <div className="p-2 bg-slate-800/50 rounded border border-white/5">
                <div className="text-lg font-semibold h-7 flex items-center justify-center text-white">{selectedLetter.initial}</div>
                <div className="text-[9px] font-mono text-slate-400">Initial</div>
              </div>
              <div className="p-2 bg-slate-800/50 rounded border border-white/5">
                <div className="text-lg font-semibold h-7 flex items-center justify-center text-white">{selectedLetter.medial}</div>
                <div className="text-[9px] font-mono text-slate-400">Medial</div>
              </div>
              <div className="p-2 bg-slate-800/50 rounded border border-white/5">
                <div className="text-lg font-semibold h-7 flex items-center justify-center text-white">{selectedLetter.final}</div>
                <div className="text-[9px] font-mono text-slate-400">Final</div>
              </div>
            </div>
          </div>

          {/* Example block */}
          <div className="mt-auto bg-slate-800/40 rounded-xl p-4 border border-white/5 z-10">
            <h4 className="text-[11px] font-mono uppercase text-emerald-300 tracking-wider mb-2">Example Vocabulary</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400">Classical Vocabulary</p>
                <p className="text-sm font-semibold tracking-tight text-white mt-0.5">{selectedLetter.exampleMeaning}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold font-sans text-emerald-200">{selectedLetter.exampleWord}</p>
              </div>
            </div>
          </div>

          {/* User Feedback Alert */}
          {feedback && (
            <div className="absolute bottom-4 left-4 right-4 bg-amber-500/90 text-slate-950 text-xs py-2 px-3 rounded-lg flex items-center gap-2 border border-amber-400/20 backdrop-blur-xs z-20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

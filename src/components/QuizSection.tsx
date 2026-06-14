import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../data";
import { QuizQuestion } from "../types";
import { HelpCircle, Star, Award, RotateCcw, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export default function QuizSection() {
  const [activeDifficulty, setActiveDifficulty] = useState<"All" | "Beginner" | "Intermediate" | "Scholar">("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (q) => activeDifficulty === "All" || q.difficulty === activeDifficulty
  );

  const activeQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleDifficultyChange = (diff: "All" | "Beginner" | "Intermediate" | "Scholar") => {
    setActiveDifficulty(diff);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    setScore(0);
    setShowSummary(false);
  };

  const handleOptionClick = (optionIdx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIndex(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || hasSubmitted || !activeQuestion) return;
    setHasSubmitted(true);
    if (selectedOptionIndex === activeQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    setScore(0);
    setShowSummary(false);
  };

  const getBadgeNameAndTitle = (finalScore: number, totalQuestions: number) => {
    const ratio = finalScore / totalQuestions;
    if (ratio >= 0.9) return { emoji: "\uD83C\uDFC6", name: "Grand Scholar (Alim)", desc: "Outstanding! You possess meticulous, scholarly knowledge of Islamic pillars, sciences, and history." };
    if (ratio >= 0.6) return { emoji: "\uD83C\uDF1F", name: "Knowledge Seeker (Talib)", desc: "Well done! You have a firm, robust understanding of fundamental and advanced Islamic values." };
    return { emoji: "\uD83C\uDF31", name: "Faith Novice (Mubtadi)", desc: "A great start! Seeking knowledge is a lifelong journey. Keep studying, reading, and learning." };
  };

  return (
    <div id="quiz-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col">
          <span className="text-xs font-mono text-slate-400 font-medium mb-3 uppercase tracking-wider">Select Theme Difficulty</span>
          <div className="space-y-2">
            {(["All", "Beginner", "Intermediate", "Scholar"] as const).map((diff) => {
              const isSelected = activeDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => handleDifficultyChange(diff)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold tracking-tight transition-all flex items-center justify-between cursor-pointer ${
                    isSelected ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold" : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${isSelected ? "text-emerald-500 fill-emerald-500" : "text-slate-400"}`} />
                    {diff} Pool
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
                    {diff === "All" ? QUIZ_QUESTIONS.length : QUIZ_QUESTIONS.filter((q) => q.difficulty === diff).length} Qs
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-900 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider block mb-1">Knowledge Challenge Metrics</span>
            <p className="text-xs text-slate-400">Answer correctly to unlock higher ranks and expand your scholarly depth.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4 border-y border-white/5 py-4">
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-emerald-300 block">{score}</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-1 block">Score Details</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-slate-200 block">{filteredQuestions.length - currentIndex}</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-1 block">Left in Pool</span>
            </div>
          </div>
          <p className="text-[10px] text-emerald-300/80 italic text-center">* 'The seeking of knowledge is obligatory upon every Muslim.' (Ibn Majah)</p>
        </div>
      </div>

      <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col min-h-[420px] justify-between">
        {!showSummary && activeQuestion ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-sans font-semibold text-slate-800">Question {currentIndex + 1} of {filteredQuestions.length}</span>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{activeQuestion.difficulty}</span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-sans font-medium text-slate-950 leading-relaxed">{activeQuestion.question}</h3>
            </div>

            <div className="space-y-2.5">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === activeQuestion.correctAnswerIndex;
                let buttonStyle = "bg-slate-50 border-slate-150 text-slate-800 hover:bg-slate-100/60";
                if (hasSubmitted) {
                  if (isCorrect) buttonStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs";
                  else if (isSelected && !isCorrect) buttonStyle = "bg-rose-50 border-rose-400 text-rose-800 shadow-xs";
                  else buttonStyle = "bg-slate-50 border-slate-150/40 text-slate-400 pointer-events-none opacity-40";
                } else if (isSelected) {
                  buttonStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-medium scale-101";
                }
                return (
                  <button key={option} onClick={() => handleOptionClick(idx)} disabled={hasSubmitted} className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${buttonStyle}`}>
                    <span>{option}</span>
                    <div className="flex items-center gap-2">
                      {hasSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{["A", "B", "C", "D"][idx]}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              {hasSubmitted ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mt-4">
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-1">Knowledge Explanation</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{activeQuestion.explanation}</p>
                  <button onClick={handleNextQuestion} className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-6 rounded-xl text-xs tracking-tight transition-all cursor-pointer shadow-md shadow-emerald-500/10 ml-auto">
                    Next Question <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={handleSubmitAnswer} disabled={selectedOptionIndex === null} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-semibold py-2.5 px-6 rounded-xl text-xs tracking-tight transition-all cursor-pointer ml-auto disabled:opacity-40 disabled:pointer-events-none">
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        ) : showSummary ? (
          <div className="text-center py-6 flex flex-col items-center justify-center max-w-lg mx-auto space-y-4">
            <span className="text-6xl animate-bounce duration-1000">{getBadgeNameAndTitle(score, filteredQuestions.length).emoji}</span>
            <div className="space-y-1">
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight">Quiz Pool Completed!</h3>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-widest">Rank Unlocked:</p>
              <h4 className="text-lg font-bold text-emerald-800 tracking-tight">{getBadgeNameAndTitle(score, filteredQuestions.length).name}</h4>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 leading-relaxed font-sans">
              {getBadgeNameAndTitle(score, filteredQuestions.length).desc}
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-3 px-6 text-emerald-900 font-semibold font-mono text-sm leading-none flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              Final Score: {score} / {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
            </div>
            <button onClick={handleRestartQuiz} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-semibold py-2.5 px-6 rounded-xl text-xs tracking-tight transition-all cursor-pointer shadow-md shadow-slate-950/10">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">No questions found in this difficulty pool.</div>
        )}
      </div>
    </div>
  );
}

/**
 * 주식 MBTI - 퀴즈 검사 페이지
 * Design: 개미투자자 밈 감성 + Y2K 팝아트
 * Palette: 딥 네이비(#0A0E27) + 형광 노랑(FFE500) + 코랄 레드(FF4444)
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { questions, calculateMbtiType, initialScores, type MbtiDimension } from "@/lib/mbtiData";

const QUIZ_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/quiz-bg-cCCvpXJPDo3TNDdPtvXj3j.webp";

// 진행도에 따른 응원 메시지
const encouragements = [
  "시작이 반이다! 💪",
  "잘 하고 있어요! 📈",
  "중간 지점 통과! 🎯",
  "거의 다 왔어요! 🚀",
  "마지막 스퍼트! ⚡",
];

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<MbtiDimension, number>>({ ...initialScores });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;
  const encouragementIndex = Math.floor((currentQ / questions.length) * encouragements.length);

  const handleAnswer = (answerIndex: number) => {
    if (isAnimating) return;
    setSelectedAnswer(answerIndex);

    setTimeout(() => {
      const answer = question.answers[answerIndex];
      const newScores = { ...scores };

      Object.entries(answer.scores).forEach(([dim, val]) => {
        newScores[dim as MbtiDimension] = (newScores[dim as MbtiDimension] || 0) + (val || 0);
      });

      setDirection(1);
      setIsAnimating(true);

      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setScores(newScores);
          setCurrentQ(currentQ + 1);
          setSelectedAnswer(null);
          setIsAnimating(false);
        } else {
          const mbtiType = calculateMbtiType(newScores);
          navigate(`/result/${mbtiType}`);
        }
      }, 300);
    }, 400);
  };

  const handleBack = () => {
    if (currentQ > 0 && !isAnimating) {
      setDirection(-1);
      setCurrentQ(currentQ - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#0A0E27",
        backgroundImage: `url(${QUIZ_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-[#0A0E27]/85 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 헤더 */}
        <header className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto w-full">
          <button
            onClick={() => navigate("/")}
            className="text-white/50 hover:text-[#FFE500] transition-colors text-sm flex items-center gap-1"
          >
            ← 홈으로
          </button>
          <div className="headline-font text-[#FFE500] text-lg">주식 MBTI</div>
          <div className="text-white/50 text-sm ticker-text">
            {currentQ + 1} / {questions.length}
          </div>
        </header>

        {/* 진행 바 */}
        <div className="px-4 max-w-2xl mx-auto w-full mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/40 text-xs">
              {encouragements[Math.min(encouragementIndex, encouragements.length - 1)]}
            </span>
            <span className="text-[#FFE500] text-xs font-bold ticker-text">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-bar-fill rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* 질문 번호 배지 */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#FFE500] text-[#0A0E27] headline-font text-sm px-3 py-1 rounded-full">
                    Q{currentQ + 1}
                  </div>
                  {question.subtext && (
                    <span className="text-white/40 text-sm">{question.subtext}</span>
                  )}
                </div>

                {/* 질문 텍스트 */}
                <h2 className="text-2xl md:text-3xl text-white mb-8 leading-tight">
                  {question.text}
                </h2>

                {/* 답변 선택지 */}
                <div className="space-y-4">
                  {question.answers.map((answer, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`answer-card w-full text-left p-5 rounded-xl flex items-start gap-4 ${
                        selectedAnswer === i ? "selected" : ""
                      }`}
                    >
                      {/* 이모지 */}
                      <span className="text-3xl flex-shrink-0 mt-0.5">{answer.emoji}</span>

                      {/* 텍스트 */}
                      <div className="flex-1">
                        <p className={`text-base md:text-lg font-medium leading-snug ${
                          selectedAnswer === i ? "text-[#FFE500]" : "text-white"
                        }`}>
                          {answer.text}
                        </p>
                      </div>

                      {/* 선택 표시 */}
                      <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                        selectedAnswer === i
                          ? "border-[#FFE500] bg-[#FFE500]"
                          : "border-white/20"
                      }`}>
                        {selectedAnswer === i && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-full h-full rounded-full bg-[#FFE500] flex items-center justify-center"
                          >
                            <span className="text-[#0A0E27] text-xs font-bold">✓</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* 뒤로가기 */}
                {currentQ > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 text-white/30 hover:text-white/60 transition-colors text-sm w-full text-center"
                  >
                    ← 이전 질문으로
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* 하단 밈 텍스트 */}
        <div className="px-4 py-4 text-center text-white/20 text-xs ticker-text">
          솔직하게 답할수록 정확한 결과가 나옵니다 (아마도)
        </div>
      </div>
    </div>
  );
}

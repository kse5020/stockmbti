/**
 * 주식 MBTI - 결과 페이지 (클린 디자인)
 * Design: 개미투자자 밈 감성 + 깔끔한 숫자 배지 스타일
 */

import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { mbtiResults } from "@/lib/mbtiData";

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ["#FFE500", "#FF4444", "#22c55e", "#3b82f6", "#a855f7", "#f97316"];
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 10,
      }));
      setParticles(newParticles);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function Result() {
  const params = useParams<{ type: string }>();
  const [, navigate] = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const type = params.type?.toUpperCase() || "ESTJ";
  const result = mbtiResults[type] || mbtiResults["ESTJ"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      setShowConfetti(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const text = `나의 주식 MBTI는 ${result.type} "${result.title}" ${result.emoji}\n${result.subtitle}\n\n주식 MBTI 테스트 해보기 👇`;
    if (navigator.share) {
      navigator.share({ title: "주식 MBTI", text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text + "\n" + window.location.origin);
      alert("클립보드에 복사됐어요! 친구한테 공유해보세요 📤");
    }
  };

  const memeLines = result.memeText.split("\n").filter((line) => line.trim());

  return (
    <div className="h-screen w-screen bg-[#0A0E27] relative overflow-hidden flex flex-col">
      {/* 애니메이션 배경 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#FFE500] opacity-10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF4444] opacity-10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3b82f6] rounded-full blur-3xl"
        ></motion.div>
      </div>

      <Confetti active={showConfetti} />

      {/* 헤더 */}
      <header className="relative z-10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-white/50 hover:text-[#FFE500] transition-colors text-sm font-medium"
        >
          ← 홈으로
        </button>
        <div className="headline-font text-[#FFE500] text-lg">주식 MBTI</div>
        <button
          onClick={() => navigate("/quiz")}
          className="text-white/50 hover:text-[#FFE500] transition-colors text-sm font-medium"
        >
          다시하기 🔄
        </button>
      </header>

      <main className="relative z-10 px-4 py-8 flex-1 overflow-y-auto flex flex-col items-center">
        {!revealed && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              📊
            </motion.div>
            <p className="headline-font text-[#FFE500] text-xl">분석 중...</p>
            <p className="text-white/40 text-sm mt-2">AI가 당신의 투자 성향을 분석하고 있습니다</p>
          </div>
        )}

        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* 1. 메인 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
              className="mb-20 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                className="text-9xl mb-6 drop-shadow-lg"
              >
                {result.emoji}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-white/40 text-sm mb-4 tracking-[0.2em] font-bold"
              >
                당신의 주식 MBTI
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="headline-font text-8xl mb-4 leading-none"
                style={{
                  color: result.color,
                  textShadow: `0 0 40px ${result.color}80, 0 0 80px ${result.color}40`,
                }}
              >
                {result.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="headline-font text-3xl text-white mb-4 drop-shadow-lg"
              >
                {result.type}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#FFE500] font-bold text-xl drop-shadow-lg"
              >
                {result.subtitle}
              </motion.div>
            </motion.div>

            {/* 2. 투자 스타일 & 투자 성향 - 2단 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-16 grid grid-cols-1 gap-6 w-full max-w-md"
            >
              {/* 왼쪽: 투자 방식 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-blue-500/20"></div>
                <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/60 transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                  <h3 className="headline-font text-3xl text-white mb-6 drop-shadow-lg">투자 방식</h3>
                  <p className="text-white/70 text-base leading-relaxed font-medium">
                    {result.description}
                  </p>
                </div>
              </motion.div>

              {/* 오른쪽: 투자 성향 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-purple-500/20"></div>
                <div className="relative bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-300 h-full">
                  <h3 className="headline-font text-3xl text-white mb-8 drop-shadow-lg text-center">성향 특징</h3>
                  <div className="space-y-6">
                    {memeLines.slice(0, 4).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className="flex items-center gap-4 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex-shrink-0 headline-font text-2xl font-light"
                          style={{
                            color: "#a855f7",
                            textShadow: "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)",
                          }}
                        >
                          {i + 1}
                        </motion.div>
                        <p className="text-white/70 text-base leading-relaxed font-medium">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 3. 장점 / 단점 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12 grid grid-cols-1 gap-4 w-full max-w-md"
            >
              {/* 장점 */}
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-green-500/30"></div>
                <div className="relative bg-gradient-to-br from-green-500/15 to-green-500/5 backdrop-blur-xl border-2 border-green-500/40 rounded-2xl p-6 hover:border-green-400/70 transition-all duration-300">
                  <h3 className="headline-font text-xl text-green-400 mb-4 flex items-center gap-2">
                    <span>✅</span> 장점
                  </h3>
                  <ul className="space-y-3">
                    {result.strengths.map((s, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.85 + i * 0.05 }}
                        className="text-white/70 text-sm font-medium flex items-start gap-3"
                      >
                        <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                        <span>{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 단점 */}
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-red-500/30"></div>
                <div className="relative bg-gradient-to-br from-red-500/15 to-red-500/5 backdrop-blur-xl border-2 border-red-500/40 rounded-2xl p-6 hover:border-red-400/70 transition-all duration-300">
                  <h3 className="headline-font text-xl text-red-400 mb-4 flex items-center gap-2">
                    <span>⚠️</span> 단점
                  </h3>
                  <ul className="space-y-3">
                    {result.weaknesses.map((w, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.85 + i * 0.05 }}
                        className="text-white/70 text-sm font-medium flex items-start gap-3"
                      >
                        <span className="text-red-400 mt-1 flex-shrink-0">•</span>
                        <span>{w}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 4. 궁합 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="mb-12 grid grid-cols-1 gap-4 w-full max-w-md"
            >
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-pink-500/30"></div>
                <div className="relative bg-gradient-to-br from-pink-500/15 to-pink-500/5 backdrop-blur-xl border-2 border-pink-500/40 rounded-2xl p-6 hover:border-pink-400/70 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      💕
                    </motion.div>
                    <div>
                      <div className="text-white/40 text-xs font-mono tracking-widest">찰떡 궁합</div>
                      <div className="headline-font text-lg text-pink-400">{result.compatibleWith}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 bg-red-500/30"></div>
                <div className="relative bg-gradient-to-br from-red-500/15 to-red-500/5 backdrop-blur-xl border-2 border-red-500/40 rounded-2xl p-6 hover:border-red-400/70 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="text-4xl"
                    >
                      💔
                    </motion.div>
                    <div>
                      <div className="text-white/40 text-xs font-mono tracking-widest">최악의 궁합</div>
                      <div className="headline-font text-lg text-orange-400">{result.worstMatch}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. 명언 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mb-12 w-full max-w-md text-center"
            >
              <p className="text-white/40 text-sm mb-6 font-medium tracking-widest">당신의 투자 명언</p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="headline-font text-2xl text-white italic leading-tight drop-shadow-lg"
              >
                "{result.famousQuote}"
              </motion.p>
            </motion.div>

            {/* 6. 액션 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 }}
              className="flex flex-row gap-3 mb-12 w-full max-w-md"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="stock-btn-primary flex-1 py-3 text-base rounded-xl shadow-lg"
                style={{ fontFamily: "'Black Han Sans', sans-serif" }}
              >
                📤 친구한테 공유하기
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/quiz")}
                className="stock-btn-secondary flex-1 py-3 text-base rounded-xl shadow-lg"
                style={{ fontFamily: "'Black Han Sans', sans-serif" }}
              >
                🔄 다시 테스트하기
              </motion.button>
            </motion.div>

            {/* 7. 다른 유형 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
              className="text-center w-full max-w-md"
            >
              <p className="text-white/30 text-sm mb-3 font-medium">다른 유형도 궁금하다면?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(mbtiResults)
                  .filter((t) => t !== type)
                  .slice(0, 8)
                  .map((t, i) => (
                    <motion.button
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 229, 0, 0.2)" }}
                      onClick={() => navigate(`/result/${t}`)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-[#FFE500] text-xs transition-all font-mono"
                    >
                      {t}
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 py-4 px-4 text-center text-white/20 text-xs mt-auto">
        <p className="font-medium">이 결과는 재미를 위한 것입니다. 실제 투자 조언이 아닙니다. 📉</p>
      </footer>
    </div>
  );
}

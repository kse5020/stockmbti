/**
 * 주식 MBTI - 결과 페이지
 * Design: 개미투자자 밈 감성 + Y2K 팝아트
 * Palette: 딥 네이비(#0A0E27) + 형광 노랑(FFE500) + 코랄 레드(FF4444)
 */

import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { mbtiResults } from "@/lib/mbtiData";

const BULL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/mascot-bull-gsvRbBmEZC38P5dcbPxVaw.webp";
const BEAR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/mascot-bear-YiGhMn7NjYxtPR4dMYszAo.webp";
const RESULT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/result-card-bg-DJGfZowq9si8wtC39CK3y3.webp";

// 폭죽 파티클
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
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
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
  const cardRef = useRef<HTMLDivElement>(null);

  const type = params.type?.toUpperCase() || "ESTJ";
  const result = mbtiResults[type] || mbtiResults["ESTJ"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      setShowConfetti(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const mascotImage = result.mascot === "bull" ? BULL_IMAGE : result.mascot === "bear" ? BEAR_IMAGE : null;

  const handleShare = () => {
    const text = `나의 주식 MBTI는 ${result.type} "${result.title}" ${result.emoji}\n${result.subtitle}\n\n주식 MBTI 테스트 해보기 👇`;
    if (navigator.share) {
      navigator.share({ title: "주식 MBTI", text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text + "\n" + window.location.origin);
      alert("클립보드에 복사됐어요! 친구한테 공유해보세요 📤");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] overflow-x-hidden">
      <Confetti active={showConfetti} />

      {/* 헤더 */}
      <header className="px-4 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-white/50 hover:text-[#FFE500] transition-colors text-sm"
        >
          ← 홈으로
        </button>
        <div className="headline-font text-[#FFE500] text-lg">주식 MBTI</div>
        <button
          onClick={() => navigate("/quiz")}
          className="text-white/50 hover:text-[#FFE500] transition-colors text-sm"
        >
          다시하기 🔄
        </button>
      </header>

      <main className="px-4 py-8 max-w-3xl mx-auto">
        {/* 결과 공개 전 로딩 */}
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

        {/* 결과 카드 */}
        {revealed && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
          >
            {/* 메인 결과 카드 */}
            <div
              className="relative rounded-2xl overflow-hidden mb-6 border-2"
              style={{ borderColor: result.color + "60" }}
            >
              {/* 배경 */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url(${RESULT_BG})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${result.color}15 0%, #0A0E2790 100%)`,
                }}
              />

              <div className="relative z-10 p-6 md:p-10">
                {/* 상단: 유형 + 마스코트 */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/50 text-sm mb-2 ticker-text"
                    >
                      당신의 주식 MBTI는...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="headline-font text-6xl md:text-8xl mb-2"
                      style={{ color: result.color }}
                    >
                      {result.type}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-3xl">{result.emoji}</span>
                      <span className="headline-font text-xl md:text-2xl text-white">
                        {result.title}
                      </span>
                    </motion.div>
                  </div>

                  {mascotImage && (
                    <motion.img
                      src={mascotImage}
                      alt="마스코트"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="w-24 md:w-36 flex-shrink-0"
                    />
                  )}
                </div>

                {/* 부제목 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-black/30 rounded-xl p-4 mb-6 border-l-4"
                  style={{ borderColor: result.color }}
                >
                  <p className="headline-font text-lg md:text-xl text-white">
                    {result.subtitle}
                  </p>
                </motion.div>

                {/* 설명 */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/80 text-base leading-relaxed mb-6"
                >
                  {result.description}
                </motion.p>

                {/* 밈 텍스트 박스 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-[#0A0E27]/60 border border-[#FFE500]/30 rounded-xl p-4 mb-6"
                >
                  <div className="text-[#FFE500]/60 text-xs mb-2 ticker-text">실제 상황 재현 🎭</div>
                  <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {result.memeText}
                  </pre>
                </motion.div>

                {/* 강점 / 약점 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="grid md:grid-cols-2 gap-4 mb-6"
                >
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="text-green-400 font-bold text-sm mb-3 flex items-center gap-1">
                      📈 강점
                    </div>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="text-red-400 font-bold text-sm mb-3 flex items-center gap-1">
                      📉 약점
                    </div>
                    <ul className="space-y-2">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">✗</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 궁합 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  <div className="bg-[#14183A] rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">💕</div>
                    <div className="text-white/40 text-xs mb-1">찰떡 궁합</div>
                    <div className="text-[#FFE500] font-bold text-sm">{result.compatibleWith}</div>
                  </div>
                  <div className="bg-[#14183A] rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">💔</div>
                    <div className="text-white/40 text-xs mb-1">최악의 궁합</div>
                    <div className="text-[#FF4444] font-bold text-sm">{result.worstMatch}</div>
                  </div>
                </motion.div>

                {/* 명언 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-center"
                >
                  <p className="text-white/40 text-xs mb-1">당신의 투자 명언</p>
                  <p className="headline-font text-lg md:text-xl text-white/80 italic">
                    {result.famousQuote}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={handleShare}
                className="stock-btn-primary flex-1 py-4 text-lg rounded-xl"
              >
                📤 친구한테 공유하기
              </button>
              <button
                onClick={() => navigate("/quiz")}
                className="stock-btn-secondary flex-1 py-4 text-lg rounded-xl"
              >
                🔄 다시 테스트하기
              </button>
            </motion.div>

            {/* 다른 유형 보기 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-center"
            >
              <p className="text-white/30 text-sm mb-4">다른 유형도 궁금하다면?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(mbtiResults)
                  .filter((t) => t !== type)
                  .slice(0, 8)
                  .map((t) => (
                    <button
                      key={t}
                      onClick={() => navigate(`/result/${t}`)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFE500]/40 rounded-lg text-white/50 hover:text-[#FFE500] text-sm transition-all ticker-text"
                    >
                      {t}
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="py-8 px-4 text-center text-white/20 text-xs">
        <p>이 결과는 재미를 위한 것입니다. 실제 투자 조언이 아닙니다. 📉</p>
      </footer>
    </div>
  );
}

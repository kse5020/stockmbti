/**
 * 주식 MBTI - 메인 홈 페이지
 * Design: 개미투자자 밈 감성 + Y2K 팝아트
 * Palette: 딥 네이비(#0A0E27) + 형광 노랑(FFE500) + 코랄 레드(FF4444)
 * Font: Black Han Sans (헤드라인) + Noto Sans KR (본문)
 */

import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/quiz-bg-cCCvpXJPDo3TNDdPtvXj3j.webp";
const BULL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/mascot-bull-gsvRbBmEZC38P5dcbPxVaw.webp";
const BEAR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663463985934/QaXRuusm6NFz4z5aNPzZDF/mascot-bear-YiGhMn7NjYxtPR4dMYszAo.webp";

// 실시간 주가 티커 데이터 (가짜)
const tickerData = [
  { symbol: "삼성전자", price: "71,400", change: "+1.2%", up: true },
  { symbol: "카카오", price: "38,250", change: "-0.8%", up: false },
  { symbol: "NAVER", price: "182,500", change: "+2.1%", up: true },
  { symbol: "현대차", price: "215,000", change: "+0.5%", up: true },
  { symbol: "SK하이닉스", price: "168,000", change: "-1.4%", up: false },
  { symbol: "LG에너지솔루션", price: "312,000", change: "+3.2%", up: true },
  { symbol: "셀트리온", price: "156,500", change: "-2.1%", up: false },
  { symbol: "POSCO홀딩스", price: "312,000", change: "+0.9%", up: true },
];

// 주식 MBTI 유형 미리보기
const typePreview = [
  { type: "ESTJ", title: "시스템 트레이더", emoji: "🤖", color: "#22c55e" },
  { type: "ESTP", title: "단타의 신", emoji: "⚡", color: "#FFE500" },
  { type: "ENFP", title: "꿈꾸는 개미", emoji: "🌈", color: "#8b5cf6" },
  { type: "ISTJ", title: "안전제일 장기투자자", emoji: "🏦", color: "#6366f1" },
  { type: "INFP", title: "희망회로 투자자", emoji: "🌙", color: "#c084fc" },
  { type: "ISTP", title: "차트 분석가", emoji: "📈", color: "#0ea5e9" },
  { type: "INTJ", title: "퀀트 투자자", emoji: "🔬", color: "#64748b" },
  { type: "ESFP", title: "인플루언서 따라쟁이", emoji: "📱", color: "#f97316" },
];

// 밈 텍스트 순환
const memeTexts = [
  "📉 오늘도 물렸습니다",
  "📈 상한가 예약 완료",
  "💸 수수료만 벌었습니다",
  "🚀 달나라 가는 중...",
  "😭 손절은 배신이다",
  "🎰 올인 각 나왔다",
];

export default function Home() {
  const [, navigate] = useLocation();
  const [memeIndex, setMemeIndex] = useState(0);
  const [chartValues] = useState(() =>
    Array.from({ length: 20 }, (_, i) =>
      30 + Math.sin(i * 0.8) * 15 + Math.random() * 10
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMemeIndex((prev) => (prev + 1) % memeTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const svgPath = chartValues
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / 19) * 300} ${60 - v}`)
    .join(" ");

  return (
    <div className="min-h-screen bg-[#0A0E27] overflow-x-hidden">
      {/* 주가 티커 */}
      <div className="bg-[#FFE500] py-2 overflow-hidden relative">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...tickerData, ...tickerData].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 text-[#0A0E27] font-bold text-sm ticker-text">
              <span>{item.symbol}</span>
              <span>{item.price}</span>
              <span className={item.up ? "text-green-700" : "text-red-700"}>
                {item.up ? "▲" : "▼"} {item.change}
              </span>
              <span className="text-[#0A0E27]/40 mx-2">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* 히어로 섹션 */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 dot-pattern">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 배경 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/60 via-transparent to-[#0A0E27]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* 밈 텍스트 배지 */}
          <motion.div
            key={memeIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="inline-block mb-6 px-4 py-2 bg-[#FF4444] text-white text-sm font-bold rounded-full ticker-text"
          >
            {memeTexts[memeIndex]}
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="headline-font text-5xl md:text-7xl lg:text-8xl text-[#FFE500] mb-4 leading-tight neon-yellow"
          >
            주식 MBTI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-2 font-bold"
          >
            나는 어떤 투자자인가?
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/50 mb-10"
          >
            단타충? 존버러? 희망회로? 지금 바로 알아보세요 🔍
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate("/quiz")}
              className="stock-btn-primary px-10 py-5 text-xl rounded-lg w-full sm:w-auto"
            >
              📊 테스트 시작하기
            </button>
            <div className="text-white/40 text-sm ticker-text">
              약 3분 소요 · 12문항
            </div>
          </motion.div>

          {/* 미니 차트 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <svg width="300" height="80" className="opacity-60">
              <path
                d={svgPath}
                fill="none"
                stroke="#FFE500"
                strokeWidth="2.5"
                className="draw-chart"
              />
              <path
                d={`${svgPath} L 300 80 L 0 80 Z`}
                fill="url(#chartGrad)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE500" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFE500" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 유형 미리보기 섹션 */}
      <section className="py-20 px-4 bg-[#0D1230]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-font text-3xl md:text-5xl text-[#FFE500] mb-3">
              총 16가지 투자자 유형
            </h2>
            <p className="text-white/60">당신은 어떤 유형일까요?</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {typePreview.map((type, i) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#14183A] border border-white/10 rounded-xl p-4 text-center hover:border-[#FFE500]/50 transition-all hover:-translate-y-1 cursor-default"
              >
                <div className="text-3xl mb-2">{type.emoji}</div>
                <div
                  className="headline-font text-lg mb-1"
                  style={{ color: type.color }}
                >
                  {type.type}
                </div>
                <div className="text-white/60 text-xs">{type.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="headline-font text-3xl md:text-4xl text-white mb-3">
              이런 분들께 추천합니다 👇
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "😭",
                title: "또 물렸어요",
                desc: "왜 나만 사면 떨어지는지 궁금한 분",
                color: "#FF4444",
              },
              {
                emoji: "🤔",
                title: "나 단타형인가?",
                desc: "내 투자 스타일이 뭔지 모르겠는 분",
                color: "#FFE500",
              },
              {
                emoji: "📤",
                title: "공유하고 싶어요",
                desc: "친구한테 자랑하고 싶은 분",
                color: "#22c55e",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#14183A] border-2 rounded-xl p-6 text-center"
                style={{ borderColor: item.color + "40" }}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3
                  className="headline-font text-xl mb-2"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 px-4 bg-[#FFE500] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="headline-font text-4xl md:text-5xl text-[#0A0E27] mb-4">
            지금 바로 확인하세요!
          </h2>
          <p className="text-[#0A0E27]/70 mb-8 text-lg">
            12문항 · 약 3분 · 완전 무료
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-[#0A0E27] text-[#FFE500] headline-font text-xl px-12 py-5 rounded-lg border-4 border-[#0A0E27] shadow-[6px_6px_0px_#0A0E27] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#0A0E27] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#0A0E27] transition-all"
          >
            📊 테스트 시작하기
          </button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 px-4 bg-[#070A1A] text-center text-white/30 text-sm">
        <p>주식 MBTI는 재미를 위한 테스트입니다. 실제 투자 조언이 아닙니다.</p>
        <p className="mt-1">투자의 책임은 본인에게 있습니다 📉</p>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// components/landing/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '1,932곳', label: 'AI 못 쓰는 로봇 중소기업' },
  { number: '50만원', label: '기존의 1/60' },
  { number: '10분', label: '점심시간에 끝남' },
  { number: '21일', label: '3주 만에 본전' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          2026 스마트공장 혁신
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          52세 김 대표도
          <br />
          <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
            10분 만에 AI 공장
          </span>
          을 갖습니다
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-300 mb-4"
        >
          3,000만원 아닌{' '}
          <span className="text-teal-400 font-bold">50만원</span>. 21일 만에
          본전.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          엑셀밖에 모르는 사장님도, AI 공장이 됩니다.
          <br />
          기계는 그대로. 칩만 붙이세요.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/40 hover:scale-105">
            무료 파일럿 신청
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
          <button className="px-8 py-4 border border-gray-600 hover:border-teal-400 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-teal-500/5">
            데모 보기
          </button>
        </motion.div>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-teal-500/50 rounded-2xl p-5 transition-all duration-300 hover:bg-gray-800/80"
            >
              <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs">스크롤</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

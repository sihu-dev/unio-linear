// components/landing/SolutionSection.tsx
'use client';

import { motion } from 'framer-motion';

const comparisons = [
  { label: '비용', old: '3,000만원', new: '50만원' },
  { label: '시간', old: '6개월', new: '10분' },
  { label: '학습', old: '1년', new: '0일' },
  { label: '기존 설비', old: '교체', new: '그대로' },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-gray-950 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            UNIO는 <span className="text-teal-400">다르게</span> 갑니다
          </h2>
        </motion.div>

        {/* Philosophy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto text-center"
        >
          새 시스템 배우라고 하지 않습니다.
          <br />
          <span className="text-teal-400 font-semibold">
            엑셀 쓰던 대로 쓰세요. AI가 알아서 합니다.
          </span>
        </motion.p>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-gray-900/80 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 text-center">
            <div className="p-5 bg-gray-800/50 font-bold text-gray-400 border-b border-gray-800">
              항목
            </div>
            <div className="p-5 bg-gray-800/50 font-bold text-gray-400 border-b border-gray-800">
              기존 스마트공장
            </div>
            <div className="p-5 bg-teal-900/30 font-bold text-teal-400 border-b border-teal-800/50">
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                UNIO
              </span>
            </div>
          </div>

          {/* Table rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="grid grid-cols-3 text-center"
            >
              <div
                className={`p-5 font-medium text-white border-b border-gray-800/50 ${
                  i % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-800/30'
                }`}
              >
                {row.label}
              </div>
              <div
                className={`p-5 text-gray-500 line-through border-b border-gray-800/50 ${
                  i % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-800/30'
                }`}
              >
                {row.old}
              </div>
              <div
                className={`p-5 text-teal-400 font-bold border-b border-teal-800/20 ${
                  i % 2 === 0 ? 'bg-teal-900/10' : 'bg-teal-900/20'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {row.new}
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-teal-500/10 border border-teal-500/20 rounded-full">
            <span className="text-teal-400 font-semibold">
              기존 대비 1/60 비용
            </span>
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            <span className="text-teal-400 font-semibold">
              도입 시간 99% 단축
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

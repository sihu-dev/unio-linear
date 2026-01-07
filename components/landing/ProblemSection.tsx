// components/landing/ProblemSection.tsx
'use client';

import { motion } from 'framer-motion';

const realityStats = [
  { label: '로봇 설치 중소기업', value: '2,460곳' },
  { label: 'AI 쓰는 곳', value: '528곳 (21%)', dim: true },
  { label: 'AI 못 쓰는 곳', value: '1,932곳 (79%)', highlight: true },
  { label: '여전히 종이 쓰는 곳', value: '92%' },
];

const barriers = [
  { icon: '💰', title: '돈', desc: '스마트공장 3,000만원' },
  { icon: '⏰', title: '시간', desc: '도입 6개월, 적응 1년' },
  { icon: '👴', title: '사람', desc: '평균 52세, IT 인력 없음' },
  { icon: '😰', title: '두려움', desc: '"라인 서면 어떡해"' },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-gray-900 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-teal-400">1,932곳</span>이 막막합니다
          </h2>
          <p className="text-xl text-gray-400">
            로봇 중소기업 79%가 AI를 쓰지 못하고 있습니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Kim's story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl p-8 border border-gray-700/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-3xl shadow-lg">
                👨‍🔧
              </div>
              <div>
                <div className="text-xl font-bold text-white">김영수 대표</div>
                <div className="text-gray-400">58세, 로봇 설치 28년 차</div>
                <div className="text-sm text-gray-500">경기도 안산, 직원 12명</div>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 mb-6">
              <p className="leading-relaxed">
                새벽 5시 출근.
                <br />
                엑셀 켜고 어제 작업 정리.
                <br />
                불량 나면 밤새 재작업.
              </p>

              <blockquote className="border-l-4 border-teal-500/50 pl-4 py-2 italic text-gray-400 bg-gray-800/50 rounded-r-lg">
                "스마트공장이요? 3,000만원이래요.
                <br />
                우리 같은 데가 어떻게..."
              </blockquote>

              <blockquote className="border-l-4 border-teal-500/50 pl-4 py-2 italic text-gray-400 bg-gray-800/50 rounded-r-lg">
                "AI요? 그게 뭔지도 모르겠어요.
                <br />
                엑셀도 아들이 깔아줬는데..."
              </blockquote>
            </div>

            <div className="text-center pt-4 border-t border-gray-700">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                김 대표 같은 분이 1,932명
              </span>
            </div>
          </motion.div>

          {/* Reality stats + Barriers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Reality stats */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full" />
                숫자로 보는 현실
              </h3>
              <div className="space-y-3">
                {realityStats.map((row) => (
                  <div
                    key={row.label}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                      row.highlight
                        ? 'bg-teal-500/10 text-teal-400 font-bold'
                        : row.dim
                          ? 'text-gray-500'
                          : 'text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    <span>{row.label}</span>
                    <span className="font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Barriers */}
            <div className="grid grid-cols-2 gap-4">
              {barriers.map((barrier, index) => (
                <motion.div
                  key={barrier.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-2xl p-5 border border-gray-700/50 text-center hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {barrier.icon}
                  </div>
                  <div className="font-bold text-white text-lg mb-1">
                    {barrier.title}
                  </div>
                  <div className="text-sm text-gray-400">{barrier.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

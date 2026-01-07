// components/landing/ProofSection.tsx
'use client';

import { motion } from 'framer-motion';

const partners = [
  {
    name: 'CM TECH',
    industry: '유량계/계측기 제조',
    location: '경기도',
    before: ['불량률 15%', '검사 4시간/일'],
    after: ['불량률 5%', '검사 2시간/일'],
    improvement: '불량률 67%↓',
    improvementColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10',
  },
  {
    name: '(주)벽산',
    industry: '건축자재 (단열재, 천장재)',
    location: '전북 익산',
    before: ['가동률 75%', '종이 기록'],
    after: ['가동률 92%', '자동 기록'],
    improvement: '가동률 23%↑',
    improvementColor: 'text-blue-400',
    bgGradient: 'from-blue-500/10',
  },
  {
    name: '삼웅철강(주)',
    industry: '철강 레이저 절단',
    location: '경기 김포',
    before: ['외주비 500만/월', '육안 검사'],
    after: ['외주비 200만/월', 'AI 검사'],
    improvement: '외주비 60%↓',
    improvementColor: 'text-purple-400',
    bgGradient: 'from-purple-500/10',
  },
];

export function ProofSection() {
  return (
    <section id="proof" className="py-24 bg-gray-950 px-6">
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
            <span className="text-teal-400">3곳</span>에서 증명합니다
          </h2>
          <p className="text-xl text-gray-400">
            3개 업종, 3개 규모, 3개 지역. 되면 어디든 됩니다.
          </p>
        </motion.div>

        {/* Partner cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`group bg-gradient-to-br ${partner.bgGradient} to-gray-900/50 bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden hover:border-teal-500/30 transition-all duration-500`}
            >
              {/* Header */}
              <div className="bg-gray-800/80 p-6 border-b border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-sm">{partner.industry}</p>
                <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {partner.location}
                </p>
              </div>

              {/* Before/After */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Before */}
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                      Before
                    </div>
                    {partner.before.map((item) => (
                      <div
                        key={item}
                        className="text-gray-500 text-sm line-through mb-1"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* After */}
                  <div>
                    <div className="text-xs text-teal-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                      After
                    </div>
                    {partner.after.map((item) => (
                      <div
                        key={item}
                        className="text-white text-sm font-semibold mb-1"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvement badge */}
                <div className="text-center py-4 bg-gray-800/50 rounded-2xl border border-gray-700/30 group-hover:border-teal-500/20 transition-colors">
                  <span
                    className={`text-3xl font-bold ${partner.improvementColor}`}
                  >
                    {partner.improvement}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">실증 파트너 진행 중</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['제조업', '건축자재', '철강', '계측기'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-800/50 text-gray-400 text-sm rounded-full border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

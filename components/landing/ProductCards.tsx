// components/landing/ProductCards.tsx
'use client';

import { motion } from 'framer-motion';

const products = [
  {
    icon: '🔌',
    name: 'OTT칩',
    title: '기계는 그대로, 칩만 붙입니다',
    desc: '기존 설비에 10분 설치. 실시간 IoT 데이터 수집.',
    stats: ['50만원', '10분 설치'],
    gradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    icon: '📊',
    name: '엑셀 브릿지',
    title: '엑셀 그대로 쓰세요',
    desc: '엑셀에 쓰면 AI로 가고, AI가 분석해서 엑셀로 옵니다.',
    stats: ['학습 0일', '6개 시트 자동'],
    gradient: 'from-green-500/20 to-green-600/10',
    borderColor: 'hover:border-green-500/50',
  },
  {
    icon: '🤖',
    name: '도메인 AI',
    title: '그 기계를 압니다',
    desc: '범용 AI 아닙니다. 로봇 설치 현장 전문 AI입니다.',
    stats: ['85% 정확도', '불량 예측'],
    gradient: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'hover:border-purple-500/50',
  },
  {
    icon: '📄',
    name: 'AutoReport',
    title: '버튼 하나, 30초',
    desc: '정부 증빙 서류 자동 생성. 반려 걱정 끝.',
    stats: ['30초 생성', '정부 양식'],
    gradient: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'hover:border-orange-500/50',
  },
];

export function ProductCards() {
  return (
    <section id="products" className="py-24 bg-gray-900 px-6">
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
            UNIO <span className="text-teal-400">4가지 무기</span>
          </h2>
          <p className="text-xl text-gray-400">
            각각이 문제를 해결합니다. 함께 쓰면 더 강력합니다.
          </p>
        </motion.div>

        {/* Product cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-gradient-to-br ${product.gradient} bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 ${product.borderColor} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>

              {/* Name badge */}
              <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-semibold rounded-full mb-3">
                {product.name}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                {product.desc}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                {product.stats.map((stat) => (
                  <span
                    key={stat}
                    className="px-3 py-1.5 bg-gray-900/80 text-teal-400 text-xs font-medium rounded-lg border border-gray-700/50"
                  >
                    {stat}
                  </span>
                ))}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            4가지 무기, 하나의 플랫폼에서 통합 관리
          </p>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl border border-gray-700 transition-all duration-300">
            제품 상세 보기 →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

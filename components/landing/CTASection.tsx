// components/landing/CTASection.tsx
'use client';

import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-teal-950/30 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span className="text-teal-400">1,932분</span>의 김 대표님이
            <br />
            기다리고 있습니다
          </h2>

          <p className="text-xl text-gray-300 mb-10">
            무료 파일럿으로 직접 확인하세요.
            <br />
            <span className="text-teal-400 font-semibold">
              설치 10분, 체험 30일, 비용 0원.
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-12 py-5 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-400/50 mb-10"
          >
            무료 파일럿 신청하기
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.button>

          <div className="flex flex-col sm:flex-row gap-6 justify-center text-gray-400">
            <a
              href="tel:010-0000-0000"
              className="flex items-center justify-center gap-2 hover:text-teal-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              010-XXXX-XXXX
            </a>
            <a
              href="mailto:unio@rainpeople.co.kr"
              className="flex items-center justify-center gap-2 hover:text-teal-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              unio@rainpeople.co.kr
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

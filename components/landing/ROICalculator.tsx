// components/landing/ROICalculator.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export function ROICalculator() {
  const [machines, setMachines] = useState(5);
  const [defectRate, setDefectRate] = useState(15);
  const [outsourceCost, setOutsourceCost] = useState(300);

  // ROI 계산
  const calculations = useMemo(() => {
    const unioCost = machines * 50; // 만원
    const defectSaving = machines * (defectRate / 100) * 0.67 * 100 * 12; // 연간 불량 절감
    const outsourceSaving = outsourceCost * 0.6 * 12; // 연간 외주비 절감
    const totalSaving = defectSaving + outsourceSaving;
    const roiDays = Math.max(1, Math.round(unioCost / (totalSaving / 365)));

    return { unioCost, totalSaving, roiDays };
  }, [machines, defectRate, outsourceCost]);

  return (
    <section className="py-24 bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            얼마나 <span className="text-teal-400">아낄 수 있을까요?</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-center mb-12"
        >
          우리 공장에 맞는 ROI를 계산해보세요
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          {/* Input sliders */}
          <div className="space-y-8 mb-10">
            {/* Machines */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-gray-300 font-medium">설비 대수</label>
                <span className="text-teal-400 font-bold text-lg">
                  {machines}대
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={machines}
                onChange={(e) => setMachines(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider-teal"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(machines / 50) * 100}%, #374151 ${(machines / 50) * 100}%, #374151 100%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1대</span>
                <span>50대</span>
              </div>
            </div>

            {/* Defect rate */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-gray-300 font-medium">현재 불량률</label>
                <span className="text-teal-400 font-bold text-lg">
                  {defectRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={defectRate}
                onChange={(e) => setDefectRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${((defectRate - 5) / 25) * 100}%, #374151 ${((defectRate - 5) / 25) * 100}%, #374151 100%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>5%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Outsource cost */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-gray-300 font-medium">월 외주비</label>
                <span className="text-teal-400 font-bold text-lg">
                  {outsourceCost}만원
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={outsourceCost}
                onChange={(e) => setOutsourceCost(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(outsourceCost / 1000) * 100}%, #374151 ${(outsourceCost / 1000) * 100}%, #374151 100%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>0원</span>
                <span>1,000만원</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700/50">
            <motion.div
              key={calculations.unioCost}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center p-4 bg-gray-900/50 rounded-2xl"
            >
              <div className="text-sm text-gray-400 mb-2">UNIO 도입 비용</div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {calculations.unioCost.toLocaleString()}
                <span className="text-lg text-gray-400">만원</span>
              </div>
            </motion.div>

            <motion.div
              key={calculations.totalSaving}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center p-4 bg-teal-900/20 rounded-2xl border border-teal-500/20"
            >
              <div className="text-sm text-teal-400 mb-2">예상 연간 절감</div>
              <div className="text-2xl md:text-3xl font-bold text-teal-400">
                {Math.round(calculations.totalSaving).toLocaleString()}
                <span className="text-lg text-teal-500">만원</span>
              </div>
            </motion.div>

            <motion.div
              key={calculations.roiDays}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center p-4 bg-teal-900/20 rounded-2xl border border-teal-500/20"
            >
              <div className="text-sm text-teal-400 mb-2">투자 회수</div>
              <div className="text-2xl md:text-3xl font-bold text-teal-400">
                {calculations.roiDays}
                <span className="text-lg text-teal-500">일</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              * 실제 절감액은 운영 환경에 따라 다를 수 있습니다
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface SprintData {
  week: string;
  completed: number;
  inProgress: number;
  total: number;
}

const ProgressChart: React.FC = () => {
  const sprintData: SprintData[] = useMemo(
    () => [
      { week: 'W1', completed: 12, inProgress: 8, total: 28 },
      { week: 'W2', completed: 18, inProgress: 10, total: 32 },
      { week: 'W3', completed: 24, inProgress: 9, total: 35 },
      { week: 'W4', completed: 31, inProgress: 7, total: 38 },
      { week: 'W5', completed: 35, inProgress: 12, total: 42 },
      { week: 'W6', completed: 42, inProgress: 8, total: 45 }
    ],
    []
  );

  const maxTotal = Math.max(...sprintData.map(d => d.total));
  const avgVelocity = Math.round(
    sprintData.reduce((sum, d) => sum + d.completed, 0) / sprintData.length
  );

  const completionRate = Math.round(
    (sprintData[sprintData.length - 1].completed / sprintData[sprintData.length - 1].total) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent-purple" />
          Sprint Velocity
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent-purple" />
            <span className="text-gray-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent-purple/40" />
            <span className="text-gray-400">In Progress</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4"
        >
          <p className="text-xs text-gray-400 mb-1">Average Velocity</p>
          <p className="text-2xl font-bold text-accent-purple">{avgVelocity}</p>
          <p className="text-xs text-gray-500 mt-1">items/week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4"
        >
          <p className="text-xs text-gray-400 mb-1">Current Progress</p>
          <p className="text-2xl font-bold text-accent-purple">{completionRate}%</p>
          <p className="text-xs text-gray-500 mt-1">sprint complete</p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="space-y-4">
          {/* Y-axis labels */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <span>{maxTotal}</span>
            <span>{Math.round(maxTotal / 2)}</span>
            <span>0</span>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between gap-3 h-48">
            {sprintData.map((data, index) => {
              const completedHeight = (data.completed / maxTotal) * 100;
              const inProgressHeight = (data.inProgress / maxTotal) * 100;

              return (
                <motion.div
                  key={data.week}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  {/* Bar container */}
                  <div className="w-full flex flex-col-reverse items-end bg-gray-800 rounded-t-lg overflow-hidden h-40 relative group">
                    {/* Completed portion */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${completedHeight}%` }}
                      transition={{
                        delay: index * 0.05 + 0.2,
                        duration: 0.6,
                        ease: 'easeOut'
                      }}
                      className="w-full bg-gradient-to-t from-accent-purple to-accent-purple-light rounded-t-lg transition-all duration-300 hover:from-accent-purple-dark hover:to-accent-purple"
                    />

                    {/* In progress portion */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${inProgressHeight}%` }}
                      transition={{
                        delay: index * 0.05 + 0.1,
                        duration: 0.6,
                        ease: 'easeOut'
                      }}
                      className="w-full bg-accent-purple/30 transition-all duration-300 hover:bg-accent-purple/50"
                    />

                    {/* Tooltip */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-t-lg">
                      <div className="text-center text-xs text-white">
                        <div>{data.completed}</div>
                        <div className="text-gray-300">of {data.total}</div>
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <span className="text-xs font-medium text-gray-400 mt-2">
                    {data.week}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* X-axis label */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-700/50">
            Items Completed per Week
          </div>
        </div>
      </div>

      {/* Trend indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between bg-gradient-to-r from-accent-purple/10 to-accent-purple/5 border border-accent-purple/20 rounded-lg p-4"
      >
        <div>
          <p className="text-sm font-medium text-white">Velocity Trend</p>
          <p className="text-xs text-gray-400 mt-1">
            Consistent growth with 35% improvement over 6 weeks
          </p>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-sm font-semibold text-green-500">+35%</span>
        </div>
      </motion.div>
    </div>
  );
};

export { ProgressChart };

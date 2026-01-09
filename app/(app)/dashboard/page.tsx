'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Factory,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const stats = [
  {
    name: '활성 프로젝트',
    value: '12',
    change: '+2',
    changeType: 'positive' as const,
    icon: Factory,
  },
  {
    name: '완료된 작업',
    value: '156',
    change: '+23',
    changeType: 'positive' as const,
    icon: CheckCircle2,
  },
  {
    name: '팀 멤버',
    value: '8',
    change: '0',
    changeType: 'neutral' as const,
    icon: Users,
  },
  {
    name: '대기 중 이슈',
    value: '3',
    change: '-2',
    changeType: 'positive' as const,
    icon: AlertTriangle,
  },
];

const recentProjects = [
  {
    name: 'AutoPath',
    description: 'AI 기반 로봇 경로 자동 생성',
    progress: 100,
    status: 'completed',
  },
  {
    name: 'RoboTwin',
    description: '디지털 트윈 시뮬레이션',
    progress: 85,
    status: 'in_progress',
  },
  {
    name: 'AI 예지보전',
    description: '설비 이상 사전 감지',
    progress: 92,
    status: 'in_progress',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-semibold text-white"
          style={{ letterSpacing: '-0.5px' }}
        >
          대시보드
        </h1>
        <p className="text-gray-400 mt-1">
          UNIO 협동로봇 AI 플랫폼 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '0.8px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#5E6AD2]/10">
                <stat.icon className="w-5 h-5 text-[#5E6AD2]" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-gray-500/10 text-gray-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '0.8px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">핵심 프로젝트</h2>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{project.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    {project.status === 'completed' ? '완료' : '진행중'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#5E6AD2]">
                    {project.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '0.8px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">빠른 작업</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'AI 분석 시작', icon: Zap, color: 'bg-purple-500/10 text-purple-400' },
              { name: '새 프로젝트', icon: Factory, color: 'bg-blue-500/10 text-blue-400' },
              { name: '리포트 생성', icon: BarChart3, color: 'bg-green-500/10 text-green-400' },
              { name: '성과 분석', icon: TrendingUp, color: 'bg-orange-500/10 text-orange-400' },
            ].map((action) => (
              <button
                key={action.name}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors text-left group"
              >
                <div className={`p-2 rounded-lg ${action.color} w-fit mb-3`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-white group-hover:text-[#5E6AD2] transition-colors">
                  {action.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '0.8px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">최근 활동</h2>
        <div className="space-y-4">
          {[
            { action: 'AutoPath 프로젝트 완료', time: '2시간 전', type: 'success' },
            { action: 'RoboTwin 시뮬레이션 실행', time: '4시간 전', type: 'info' },
            { action: 'AI 예지보전 모델 업데이트', time: '어제', type: 'info' },
            { action: '신규 팀원 합류: 김호균', time: '2일 전', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

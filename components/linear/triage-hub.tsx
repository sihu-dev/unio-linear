'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Badge, Button } from '@/components/catalyst';

interface TriageItem {
  id: string;
  title: string;
  description: string;
  aiSuggestion: string;
  confidence: number;
  category: 'performance' | 'security' | 'feature' | 'bug';
  impact: 'critical' | 'high' | 'medium' | 'low';
  suggestedAssignee: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

const categoryIcons = {
  performance: Zap,
  security: AlertTriangle,
  feature: TrendingUp,
  bug: AlertTriangle
};

const categoryColors = {
  performance: 'text-yellow-500 bg-yellow-500/10',
  security: 'text-red-500 bg-red-500/10',
  feature: 'text-blue-500 bg-blue-500/10',
  bug: 'text-orange-500 bg-orange-500/10'
};

const impactColors = {
  critical: 'border-l-red-500 bg-red-500/5',
  high: 'border-l-orange-500 bg-orange-500/5',
  medium: 'border-l-yellow-500 bg-yellow-500/5',
  low: 'border-l-blue-500 bg-blue-500/5'
};

const TriageCard: React.FC<{
  item: TriageItem;
  onAccept: () => void;
  onReject: () => void;
}> = ({ item, onAccept, onReject }) => {
  const CategoryIcon = categoryIcons[item.category];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative border-l-4 rounded-lg p-4 ${impactColors[item.impact]} transition-all duration-200 hover:shadow-lg hover:shadow-accent-purple/20 cursor-pointer group`}
    >
      {/* Status badge */}
      <div className="absolute top-3 right-3">
        {item.status === 'accepted' && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
            <CheckCircle className="w-3 h-3" />
            Accepted
          </span>
        )}
        {item.status === 'rejected' && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300">
            Rejected
          </span>
        )}
        {item.status === 'pending' && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
            <Brain className="w-3 h-3" />
            AI Suggested
          </span>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 pr-32">
        <div className={`p-2 rounded-lg flex-shrink-0 ${categoryColors[item.category]}`}>
          <CategoryIcon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white">{item.title}</h3>
          <p className="text-xs text-gray-400 mt-1">{item.description}</p>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="mb-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="flex items-start gap-2 mb-1">
          <Brain className="w-4 h-4 text-accent-purple flex-shrink-0 mt-0.5" />
          <span className="text-xs font-semibold text-accent-purple">AI Suggestion</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{item.aiSuggestion}</p>

        {/* Confidence */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.confidence}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-full bg-gradient-to-r from-accent-purple to-accent-purple-light rounded-full"
            />
          </div>
          <span className="text-xs text-gray-400">{item.confidence}%</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-xs mb-3 pb-3 border-t border-gray-700/50 pt-3">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-400">Impact:</span>
            <span className="ml-1 font-medium text-white capitalize">{item.impact}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-gray-400">{item.suggestedAssignee}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <AnimatePresence>
        {isHovered && item.status === 'pending' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 pt-2 border-t border-gray-700/50"
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={onAccept}
              className="flex-1 bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30"
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReject}
              className="flex-1"
            >
              Reject
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments indicator */}
      <div className="absolute bottom-3 right-3 text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity">
        <MessageSquare className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

export const TriageHub: React.FC = () => {
  const [items, setItems] = useState<TriageItem[]>([
    {
      id: '1',
      title: '용접 라인 2번 - 온도 편차 15% 감지',
      description: '삼정테크 용접 라인에서 지난 3일간 온도 편차가 15% 증가',
      aiSuggestion: '온도 센서 #23의 출력값이 설정 범위를 벗어났습니다. 센서 교정 또는 교체를 권장하며, 예상 비용은 약 35만원입니다.',
      confidence: 92,
      category: 'bug',
      impact: 'critical',
      suggestedAssignee: '삼정테크',
      status: 'pending'
    },
    {
      id: '2',
      title: '삼정테크 로봇 - 진동 패턴 이상',
      description: '로봇 암 #4에서 비정상적인 진동 패턴 감지됨',
      aiSuggestion: '베어링 마모 징후가 감지되었습니다. 2주 내 예방 점검을 권장하며, 방치 시 생산 중단 리스크가 있습니다.',
      confidence: 88,
      category: 'performance',
      impact: 'high',
      suggestedAssignee: '삼정테크',
      status: 'pending'
    },
    {
      id: '3',
      title: '유량계 #127 - 출력 드리프트 0.3%',
      description: 'CM TECH 유량계에서 미세한 드리프트 현상 발생',
      aiSuggestion: '유량계 재조정이 필요합니다. 현재 측정 오차는 허용 범위 내이지만, 7일 내 조정하면 불량률 3% 개선 예상됩니다.',
      confidence: 95,
      category: 'performance',
      impact: 'medium',
      suggestedAssignee: 'CM TECH',
      status: 'pending'
    },
    {
      id: '4',
      title: 'CNC 온도 보정 완료',
      description: '금강기계 CNC 기계 온도 보정 작업 성공',
      aiSuggestion: '온도 보정 후 가공 정밀도가 12% 향상되었습니다. 월간 리포트에 우수 사례로 포함하는 것을 권장합니다.',
      confidence: 85,
      category: 'feature',
      impact: 'low',
      suggestedAssignee: '금강기계',
      status: 'accepted'
    },
    {
      id: '5',
      title: '월간 리포트 - 3개사 자동 생성 대기',
      description: '성진산업, 효성정밀, 대원산업 월간 품질 리포트 생성 예정',
      aiSuggestion: 'Claude API를 활용해 30초 내에 3개사 리포트를 자동 생성합니다. "승인" 버튼을 클릭하면 즉시 생성됩니다.',
      confidence: 78,
      category: 'feature',
      impact: 'medium',
      suggestedAssignee: 'UNIO',
      status: 'pending'
    }
  ]);

  const handleAccept = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: 'accepted' as const } : item
    ));
  };

  const handleReject = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: 'rejected' as const } : item
    ));
  };

  const pendingCount = items.filter(i => i.status === 'pending').length;
  const acceptedCount = items.filter(i => i.status === 'accepted').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-accent-purple" />
          AI Triage Hub
        </h2>
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-purple/10 rounded-full">
            <span className="text-xs text-accent-purple font-semibold">{pendingCount}</span>
            <span className="text-xs text-gray-300">Pending</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full">
            <span className="text-xs text-green-400 font-semibold">{acceptedCount}</span>
            <span className="text-xs text-gray-300">Accepted</span>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-accent-purple/10 border border-accent-purple/20 rounded-lg p-3 flex items-start gap-3"
      >
        <Brain className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white">AI-Powered Issue Analysis</p>
          <p className="text-xs text-gray-400 mt-1">
            Claude analyzes incoming issues and provides intelligent suggestions with impact assessments. Review and accept recommendations to auto-assign and prioritize.
          </p>
        </div>
      </motion.div>

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item) => (
          <TriageCard
            key={item.id}
            item={item}
            onAccept={() => handleAccept(item.id)}
            onReject={() => handleReject(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

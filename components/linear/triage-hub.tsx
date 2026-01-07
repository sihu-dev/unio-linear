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
      title: 'Add real-time collaboration features',
      description: 'Users request live cursor tracking and real-time comment threads',
      aiSuggestion: 'Implement WebSocket-based real-time updates using Socket.io or Pusher. Start with comment reactions and cursor positions.',
      confidence: 92,
      category: 'feature',
      impact: 'high',
      suggestedAssignee: 'Alex',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Optimize database query performance',
      description: 'Complex queries on large datasets taking 2-3 seconds',
      aiSuggestion: 'Add database indexing on frequently queried columns (assignee, status, priority). Consider query pagination and caching layer.',
      confidence: 88,
      category: 'performance',
      impact: 'critical',
      suggestedAssignee: 'Morgan',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Implement rate limiting on API',
      description: 'API endpoints vulnerable to abuse, need request throttling',
      aiSuggestion: 'Implement Redis-based rate limiting with sliding window algorithm. Set limits at 100 req/minute per IP and 1000 req/hour per user.',
      confidence: 95,
      category: 'security',
      impact: 'critical',
      suggestedAssignee: 'Jordan',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Fix memory leak in chart rendering',
      description: 'Browser memory usage increases over time when viewing charts',
      aiSuggestion: 'Issue likely in D3/Chart.js event listeners not being cleaned up. Add cleanup in useEffect return statement.',
      confidence: 85,
      category: 'bug',
      impact: 'high',
      suggestedAssignee: 'Casey',
      status: 'accepted'
    },
    {
      id: '5',
      title: 'Add dark mode theme variant',
      description: 'Users want complete dark mode support',
      aiSuggestion: 'Use CSS variables and Tailwind dark mode. Implement theme switcher in settings with localStorage persistence.',
      confidence: 78,
      category: 'feature',
      impact: 'medium',
      suggestedAssignee: 'Taylor',
      status: 'rejected'
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

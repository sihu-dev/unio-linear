'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Badge, Card } from '@/components/catalyst';

interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'open' | 'in_review' | 'closed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  labels: string[];
  createdDate: string;
  dueDate: string;
  comments: number;
}

const statusIcons = {
  open: AlertCircle,
  in_review: Clock,
  closed: CheckCircle
};

const statusColors = {
  open: 'text-red-500 bg-red-500/10',
  in_review: 'text-yellow-500 bg-yellow-500/10',
  closed: 'text-green-500 bg-green-500/10'
};

const priorityBadgeVariant = {
  critical: 'error' as const,
  high: 'warning' as const,
  medium: 'warning' as const,
  low: 'info' as const
};

const IssueCard: React.FC<{ issue: Issue; isExpanded: boolean; onToggle: () => void }> = ({
  issue,
  isExpanded,
  onToggle
}) => {
  const StatusIcon = statusIcons[issue.status];

  return (
    <motion.div
      layout
      className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-accent-purple/40 transition-colors"
    >
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-start justify-between hover:bg-gray-800/50 transition-colors text-left"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-start gap-3 flex-1">
          <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${statusColors[issue.status].split(' ')[0]}`} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-400">#{issue.number}</span>
              <h3 className="text-sm font-semibold text-white">{issue.title}</h3>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant={priorityBadgeVariant[issue.priority]} size="sm">
                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
              </Badge>
              {issue.labels.map((label) => (
                <Badge key={label} variant="default" size="sm">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">{issue.assignee}</p>
            <p className="text-xs text-gray-500 mt-0.5">{issue.dueDate}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-400"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-700/50"
          >
            <div className="px-4 py-3 space-y-3 bg-gray-800/30">
              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-gray-300 mb-1">Description</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{issue.description}</p>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700/50">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusColors[issue.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {issue.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Created</p>
                  <p className="text-xs text-gray-300">{issue.createdDate}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Assignee</p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent-purple to-accent-purple-light flex items-center justify-center text-xs font-semibold text-white">
                      {issue.assignee.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-300">{issue.assignee}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Comments</p>
                  <p className="text-xs text-gray-300">{issue.comments} {issue.comments === 1 ? 'comment' : 'comments'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const IssueTracking: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const issues: Issue[] = [
    {
      id: '1',
      number: 142,
      title: 'Batch API performance degradation',
      description: 'When running batch processes with 1000+ items, API response time exceeds 5 seconds. Need to optimize database queries and add caching.',
      status: 'in_review',
      priority: 'critical',
      assignee: 'Morgan',
      labels: ['performance', 'api', 'backend'],
      createdDate: 'Jan 5',
      dueDate: 'Jan 10',
      comments: 8
    },
    {
      id: '2',
      number: 139,
      title: 'Mobile responsiveness issues on catalog',
      description: 'Grid layout breaks on tablets and mobile devices. Card sizes need adjustment and layout should use flex instead of grid for small screens.',
      status: 'open',
      priority: 'high',
      assignee: 'Casey',
      labels: ['ui', 'mobile', 'catalog'],
      createdDate: 'Jan 3',
      dueDate: 'Jan 12',
      comments: 5
    },
    {
      id: '3',
      number: 138,
      title: 'Add search functionality to issue tracker',
      description: 'Users need ability to search issues by title, status, and assignee. Implement full-text search with filters.',
      status: 'open',
      priority: 'medium',
      assignee: 'Alex',
      labels: ['feature', 'search', 'ui'],
      createdDate: 'Jan 2',
      dueDate: 'Jan 15',
      comments: 3
    },
    {
      id: '4',
      number: 135,
      title: 'Implement email notifications',
      description: 'Send email notifications when issue is assigned, commented on, or status changes.',
      status: 'in_review',
      priority: 'high',
      assignee: 'Jordan',
      labels: ['feature', 'email', 'notifications'],
      createdDate: 'Dec 28',
      dueDate: 'Jan 14',
      comments: 12
    },
    {
      id: '5',
      number: 133,
      title: 'Dark mode support',
      description: 'Implement dark mode toggle in settings. Already completed.',
      status: 'closed',
      priority: 'medium',
      assignee: 'Taylor',
      labels: ['feature', 'ui', 'completed'],
      createdDate: 'Dec 20',
      dueDate: 'Jan 1',
      comments: 2
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Issue Tracking</h2>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors.open}`}>
            {issues.filter(i => i.status === 'open').length} Open
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors.in_review}`}>
            {issues.filter(i => i.status === 'in_review').length} In Review
          </span>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <IssueCard
              issue={issue}
              isExpanded={expandedId === issue.id}
              onToggle={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

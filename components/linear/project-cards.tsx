'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Factory,
  Zap
} from 'lucide-react';
import { Card, Badge } from '@/components/catalyst';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'planning' | 'in_progress' | 'completed';
  itemCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  icon,
  progress,
  status,
  itemCount
}) => {
  const statusVariants = {
    planning: 'default' as const,
    in_progress: 'info' as const,
    completed: 'success' as const
  };

  const statusLabels = {
    planning: 'Planning',
    in_progress: 'In Progress',
    completed: 'Completed'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-xl" />

      <Card className="relative p-6" variant="elevated" interactive>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">{title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{itemCount} items</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium text-accent-purple">{progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-accent-purple to-accent-purple-light rounded-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Badge variant={statusVariants[status]} size="sm">
            {statusLabels[status]}
          </Badge>
          <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
        </div>
      </Card>
    </motion.div>
  );
};

export const ProjectCards: React.FC = () => {
  const projects: ProjectCardProps[] = [
    {
      title: 'Pool AI',
      description: 'Direct AI integration for 50+ manufacturing companies',
      icon: <BarChart3 className="w-5 h-5" />,
      progress: 65,
      status: 'in_progress',
      itemCount: 24
    },
    {
      title: 'Smart Factory',
      description: 'Factory automation and monitoring dashboard',
      icon: <Factory className="w-5 h-5" />,
      progress: 45,
      status: 'in_progress',
      itemCount: 18
    },
    {
      title: 'Claude API',
      description: 'Complete Claude ecosystem integration 11/11',
      icon: <Zap className="w-5 h-5" />,
      progress: 100,
      status: 'completed',
      itemCount: 11
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Active Projects</h2>
        <span className="text-xs text-gray-400">3 projects</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

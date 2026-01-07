'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, GripVertical } from 'lucide-react';
import { Badge, Button, Card } from '@/components/catalyst';

interface KanbanItem {
  id: string;
  title: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color: string;
}

const priorityBadgeVariant = {
  low: 'info' as const,
  medium: 'warning' as const,
  high: 'error' as const
};

const KanbanCard: React.FC<{ item: KanbanItem }> = ({ item }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ y: -2 }}
    className="group cursor-grab active:cursor-grabbing"
  >
    <Card className="p-3" variant="default">
      <div className="flex items-start gap-2 mb-2">
        <GripVertical className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
        <h4 className="text-sm font-medium text-white flex-1 line-clamp-2">
          {item.title}
        </h4>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Badge variant={priorityBadgeVariant[item.priority]} size="sm">
          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
        </Badge>
        <span className="text-xs text-gray-400">{item.dueDate}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between">
        <span className="text-xs text-gray-400">{item.assignee}</span>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-purple-light flex items-center justify-center text-xs font-semibold text-white">
          {item.assignee.charAt(0)}
        </div>
      </div>
    </Card>
  </motion.div>
);

const KanbanColumnComponent: React.FC<{
  column: KanbanColumn;
  onItemsChange: (items: KanbanItem[]) => void;
}> = ({ column, onItemsChange }) => (
  <motion.div
    layout
    className="flex flex-col bg-gray-900 border border-gray-700 rounded-lg p-4 min-h-96 w-80"
  >
    {/* Column Header */}
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700/50">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${column.color}`} />
        <h3 className="font-semibold text-white text-sm">{column.title}</h3>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
          {column.items.length}
        </span>
      </div>
    </div>

    {/* Items */}
    <Reorder.Group
      axis="y"
      values={column.items}
      onReorder={onItemsChange}
      className="flex-1 space-y-2"
    >
      {column.items.map((item) => (
        <Reorder.Item key={item.id} value={item} className="cursor-grab">
          <KanbanCard item={item} />
        </Reorder.Item>
      ))}
    </Reorder.Group>

    {/* Add Item Button */}
    <Button variant="ghost" size="sm" className="mt-4 w-full">
      <Plus className="w-4 h-4" />
      Add item
    </Button>
  </motion.div>
);

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'discovery',
      title: 'Discovery',
      color: 'bg-blue-500',
      items: [
        {
          id: '1',
          title: 'Research new ML models for demand forecasting',
          assignee: 'Alex',
          priority: 'high',
          dueDate: 'Jan 15'
        },
        {
          id: '2',
          title: 'Analyze competitor platforms',
          assignee: 'Sam',
          priority: 'medium',
          dueDate: 'Jan 20'
        }
      ]
    },
    {
      id: 'accepted',
      title: 'Accepted',
      color: 'bg-yellow-500',
      items: [
        {
          id: '3',
          title: 'Implement batch processing API',
          assignee: 'Jordan',
          priority: 'high',
          dueDate: 'Jan 12'
        },
        {
          id: '4',
          title: 'Design dashboard UI components',
          assignee: 'Casey',
          priority: 'medium',
          dueDate: 'Jan 18'
        },
        {
          id: '5',
          title: 'Set up monitoring and alerting',
          assignee: 'Taylor',
          priority: 'low',
          dueDate: 'Jan 25'
        }
      ]
    },
    {
      id: 'kicked_off',
      title: 'Kicked off',
      color: 'bg-green-500',
      items: [
        {
          id: '6',
          title: 'Database schema optimization',
          assignee: 'Morgan',
          priority: 'high',
          dueDate: 'Jan 10'
        },
        {
          id: '7',
          title: 'Authentication integration',
          assignee: 'Alex',
          priority: 'high',
          dueDate: 'Jan 14'
        }
      ]
    }
  ]);

  const handleItemsChange = (columnId: string, items: KanbanItem[]) => {
    setColumns(columns.map(col =>
      col.id === columnId ? { ...col, items } : col
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Sprint Board</h2>
        <span className="text-xs text-gray-400">
          {columns.reduce((acc, col) => acc + col.items.length, 0)} total items
        </span>
      </div>

      <motion.div
        layout
        className="flex gap-4 overflow-x-auto pb-4"
      >
        {columns.map((column) => (
          <KanbanColumnComponent
            key={column.id}
            column={column}
            onItemsChange={(items) => handleItemsChange(column.id, items)}
          />
        ))}
      </motion.div>
    </div>
  );
};

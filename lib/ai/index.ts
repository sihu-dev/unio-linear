// UNIO AI Engine - Claude API Integration
// Lightweight client based on @unilab/ai-engine patterns

export { AIClient, getAIClient, resetAIClient } from './client';
export type { ClientConfig } from './client';

export {
  ClaudeModel,
  ModelPricing,
} from './types';

export type {
  AIEvent,
  AIEventHandler,
  AIEventType,
  AIRequest,
  AIResponse,
  ClaudeModelId,
  ContentBlock,
  CostBreakdown,
  Message,
  TaskComplexity,
  TokenUsage,
  ToolDefinition,
} from './types';

// Version
export const VERSION = '0.1.0';

// Claude API Types for UNIO
// Based on @unilab/ai-engine patterns

export type ClaudeModelId =
  | 'claude-opus-4-5-20251101'
  | 'claude-sonnet-4-5-20241022'
  | 'claude-haiku-4-5-20251101'
  | 'claude-3-5-sonnet-20241022'
  | 'claude-3-5-haiku-20241022';

export const ClaudeModel = {
  OPUS_4_5: 'claude-opus-4-5-20251101' as const,
  SONNET_4_5: 'claude-sonnet-4-5-20241022' as const,
  HAIKU_4_5: 'claude-haiku-4-5-20251101' as const,
  SONNET_3_5: 'claude-3-5-sonnet-20241022' as const,
  HAIKU_3_5: 'claude-3-5-haiku-20241022' as const,
};

// Claude API Pricing (2026.01 verified)
export const ModelPricing: Record<ClaudeModelId, { input: number; output: number; cachedInput: number }> = {
  'claude-opus-4-5-20251101': { input: 5, output: 25, cachedInput: 0.5 },
  'claude-sonnet-4-5-20241022': { input: 3, output: 15, cachedInput: 0.3 },
  'claude-haiku-4-5-20251101': { input: 1, output: 5, cachedInput: 0.1 },
  'claude-3-5-sonnet-20241022': { input: 3, output: 15, cachedInput: 0.3 },
  'claude-3-5-haiku-20241022': { input: 0.8, output: 4, cachedInput: 0.08 },
};

export type TaskComplexity = 'simple' | 'moderate' | 'complex' | 'expert';

export interface Message {
  role: 'user' | 'assistant';
  content: string | ContentBlock[];
}

export interface ContentBlock {
  type: 'text' | 'tool_use' | 'tool_result' | 'image';
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  tool_use_id?: string;
  content?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface AIRequest {
  messages: Message[];
  systemPrompt?: string;
  model?: ClaudeModelId;
  complexity?: TaskComplexity;
  maxTokens?: number;
  temperature?: number;
  tools?: ToolDefinition[];
  enableCaching?: boolean;
  thinkingBudget?: number;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
}

export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  cacheSavings: number;
  totalCost: number;
}

export interface AIResponse {
  id: string;
  model: ClaudeModelId;
  content: ContentBlock[];
  stopReason: 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use' | null;
  usage: TokenUsage;
  cost: CostBreakdown;
  thinking?: string;
}

export type AIEventType =
  | 'client_initialized'
  | 'request'
  | 'response'
  | 'error'
  | 'cache_hit'
  | 'cache_miss'
  | 'rate_limited';

export interface AIEvent {
  type: AIEventType;
  timestamp: Date;
  model?: ClaudeModelId;
  tokens?: TokenUsage;
  cost?: CostBreakdown;
  error?: string;
  metadata?: Record<string, unknown>;
}

export type AIEventHandler = (event: AIEvent) => void;

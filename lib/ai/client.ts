import Anthropic from '@anthropic-ai/sdk';
import {
  AIRequest,
  AIResponse,
  AIEvent,
  AIEventHandler,
  ClaudeModel,
  ClaudeModelId,
  ContentBlock,
  CostBreakdown,
  ModelPricing,
  TaskComplexity,
  TokenUsage,
} from './types';

export interface ClientConfig {
  apiKey?: string;
  defaultModel?: ClaudeModelId;
  defaultMaxTokens?: number;
  defaultTemperature?: number;
  eventHandlers?: AIEventHandler[];
}

export class AIClient {
  private client: Anthropic;
  private defaultModel: ClaudeModelId;
  private defaultMaxTokens: number;
  private defaultTemperature: number;
  private eventHandlers: AIEventHandler[] = [];

  constructor(config: ClientConfig = {}) {
    const apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error(
        'Anthropic API key is required. ' +
        'Provide it via config.apiKey or ANTHROPIC_API_KEY environment variable.'
      );
    }

    this.client = new Anthropic({ apiKey });
    this.defaultModel = config.defaultModel || ClaudeModel.SONNET_4_5;
    this.defaultMaxTokens = config.defaultMaxTokens || 4096;
    this.defaultTemperature = config.defaultTemperature || 0.7;
    this.eventHandlers = config.eventHandlers || [];

    this.emitEvent({
      type: 'client_initialized',
      timestamp: new Date(),
      metadata: { apiKeyPrefix: apiKey.substring(0, 10) + '...' },
    });
  }

  /**
   * Select model based on task complexity
   * - simple: Haiku 4.5 ($1/$5) - fast, cheap
   * - moderate: Sonnet 4.5 ($3/$15) - balanced (default)
   * - complex/expert: Opus 4.5 ($5/$25) - best quality
   */
  private selectModel(complexity: TaskComplexity): ClaudeModelId {
    switch (complexity) {
      case 'simple':
        return ClaudeModel.HAIKU_4_5;
      case 'moderate':
        return ClaudeModel.SONNET_4_5;
      case 'complex':
      case 'expert':
        return ClaudeModel.OPUS_4_5;
      default:
        return this.defaultModel;
    }
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    const model = request.model || this.selectModel(request.complexity || 'moderate');

    try {
      const params: Anthropic.MessageCreateParams = {
        model,
        max_tokens: request.maxTokens || this.defaultMaxTokens,
        messages: request.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })) as Anthropic.MessageParam[],
      };

      // System prompt with optional caching
      if (request.systemPrompt) {
        if (request.enableCaching) {
          params.system = [
            {
              type: 'text',
              text: request.systemPrompt,
              cache_control: { type: 'ephemeral' },
            },
          ];
        } else {
          params.system = request.systemPrompt;
        }
      }

      // Tools support
      if (request.tools && request.tools.length > 0) {
        params.tools = request.tools as Anthropic.Tool[];
      }

      // Temperature
      params.temperature = request.temperature ?? this.defaultTemperature;

      const response = await this.client.messages.create(params);

      const usage: TokenUsage = {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        cacheCreationTokens: (response.usage as any).cache_creation_input_tokens,
        cacheReadTokens: (response.usage as any).cache_read_input_tokens,
      };

      const cost = this.calculateCost(model, usage);

      const aiResponse: AIResponse = {
        id: response.id,
        model,
        content: response.content.map((block) => this.mapContentBlock(block)),
        stopReason: response.stop_reason as AIResponse['stopReason'],
        usage,
        cost,
      };

      this.emitEvent({
        type: 'response',
        timestamp: new Date(),
        model,
        tokens: usage,
        cost,
        metadata: { latencyMs: Date.now() - startTime },
      });

      return aiResponse;
    } catch (error) {
      this.emitEvent({
        type: 'error',
        timestamp: new Date(),
        model,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Extended Thinking - for complex strategic analysis
   * Uses Sonnet 4.5 or Opus 4.5 with thinking budget
   */
  async chatWithThinking(request: AIRequest): Promise<AIResponse> {
    const model = request.model || ClaudeModel.SONNET_4_5;
    const thinkingBudget = request.thinkingBudget || 10000;

    const params: Anthropic.MessageCreateParams = {
      model,
      max_tokens: (request.maxTokens || 4096) + thinkingBudget,
      messages: request.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })) as Anthropic.MessageParam[],
      thinking: {
        type: 'enabled',
        budget_tokens: thinkingBudget,
      },
    };

    if (request.systemPrompt) {
      params.system = request.systemPrompt;
    }

    const response = await this.client.messages.create(params as any);

    let thinkingContent = '';
    const contentBlocks: ContentBlock[] = [];

    for (const block of response.content) {
      if ((block as any).type === 'thinking') {
        thinkingContent = (block as any).thinking;
      } else {
        contentBlocks.push(this.mapContentBlock(block));
      }
    }

    const usage: TokenUsage = {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };

    return {
      id: response.id,
      model,
      content: contentBlocks,
      stopReason: response.stop_reason as AIResponse['stopReason'],
      usage,
      thinking: thinkingContent,
      cost: this.calculateCost(model, usage),
    };
  }

  /**
   * Vision - analyze images
   */
  async vision(
    imageBase64: string,
    mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
    prompt: string,
    options: Partial<AIRequest> = {}
  ): Promise<AIResponse> {
    const request: AIRequest = {
      ...options,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              // @ts-ignore - image block structure
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
    };

    return this.chat(request);
  }

  private mapContentBlock(block: Anthropic.ContentBlock): ContentBlock {
    if (block.type === 'text') {
      return { type: 'text', text: block.text };
    }
    if (block.type === 'tool_use') {
      return {
        type: 'tool_use',
        id: block.id,
        name: block.name,
        input: block.input as Record<string, unknown>,
      };
    }
    return { type: 'text', text: '' };
  }

  private calculateCost(model: ClaudeModelId, usage: TokenUsage): CostBreakdown {
    const pricing = ModelPricing[model];

    const inputCost = (usage.inputTokens / 1_000_000) * pricing.input;
    const outputCost = (usage.outputTokens / 1_000_000) * pricing.output;

    let cacheSavings = 0;
    if (usage.cacheReadTokens) {
      const normalCost = (usage.cacheReadTokens / 1_000_000) * pricing.input;
      const cachedCost = (usage.cacheReadTokens / 1_000_000) * pricing.cachedInput;
      cacheSavings = normalCost - cachedCost;
    }

    return {
      inputCost,
      outputCost,
      cacheSavings,
      totalCost: inputCost + outputCost - cacheSavings,
    };
  }

  private emitEvent(event: AIEvent): void {
    for (const handler of this.eventHandlers) {
      try {
        handler(event);
      } catch (error) {
        console.error('Event handler error:', error);
      }
    }
  }

  addEventHandler(handler: AIEventHandler): void {
    this.eventHandlers.push(handler);
  }

  getAnthropicClient(): Anthropic {
    return this.client;
  }
}

// Singleton instance
let defaultClient: AIClient | null = null;

export function getAIClient(config?: ClientConfig): AIClient {
  if (!defaultClient) {
    defaultClient = new AIClient(config);
  }
  return defaultClient;
}

export function resetAIClient(): void {
  defaultClient = null;
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAIClient, ClaudeModel } from '@/lib/ai';

// Request validation schema
const ChatRequestSchema = z.object({
  message: z.string().min(1),
  systemPrompt: z.string().optional(),
  complexity: z.enum(['simple', 'moderate', 'complex', 'expert']).default('moderate'),
  enableCaching: z.boolean().default(true),
  enableThinking: z.boolean().default(false),
  thinkingBudget: z.number().min(1000).max(50000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { message, systemPrompt, complexity, enableCaching, enableThinking, thinkingBudget } = parsed.data;

    const client = getAIClient();

    // Use extended thinking for complex analysis
    if (enableThinking) {
      const response = await client.chatWithThinking({
        messages: [{ role: 'user', content: message }],
        systemPrompt: systemPrompt || 'You are a helpful AI assistant for UNIO smart factory platform.',
        model: ClaudeModel.SONNET_4_5,
        thinkingBudget: thinkingBudget || 10000,
      });

      return NextResponse.json({
        success: true,
        data: {
          id: response.id,
          model: response.model,
          content: response.content.find((b) => b.type === 'text')?.text || '',
          thinking: response.thinking,
          usage: response.usage,
          cost: response.cost,
        },
      });
    }

    // Standard chat
    const response = await client.chat({
      messages: [{ role: 'user', content: message }],
      systemPrompt: systemPrompt || 'You are a helpful AI assistant for UNIO smart factory platform.',
      complexity,
      enableCaching,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: response.id,
        model: response.model,
        content: response.content.find((b) => b.type === 'text')?.text || '',
        usage: response.usage,
        cost: response.cost,
      },
    });
  } catch (error) {
    console.error('AI API error:', error);

    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'API configuration error', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'UNIO AI Engine',
    version: '0.1.0',
    models: {
      opus: ClaudeModel.OPUS_4_5,
      sonnet: ClaudeModel.SONNET_4_5,
      haiku: ClaudeModel.HAIKU_4_5,
    },
    features: [
      'Messages API',
      'Tool Use',
      'Vision',
      'Prompt Caching (90% savings)',
      'Extended Thinking',
      'Model Routing',
    ],
  });
}

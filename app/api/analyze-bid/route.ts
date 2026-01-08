// app/api/analyze-bid/route.ts
import { analyzeBid } from '@/lib/claude'
import { createBidAnalysisExcel } from '@/lib/excel'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'

// Error codes for client-safe messages
const ERROR_CODES = {
  RATE_LIMITED: 'RATE_LIMITED',
  INVALID_INPUT: 'INVALID_INPUT',
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  INVALID_FORMAT: 'INVALID_FORMAT',
  SERVER_ERROR: 'SERVER_ERROR',
} as const

// Client-safe error messages (no internal details)
const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.RATE_LIMITED]: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  [ERROR_CODES.INVALID_INPUT]: '입찰 공고 내용이 너무 짧습니다. 최소 50자 이상 입력해주세요.',
  [ERROR_CODES.ANALYSIS_FAILED]: '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  [ERROR_CODES.INVALID_FORMAT]: '지원하지 않는 출력 형식입니다.',
  [ERROR_CODES.SERVER_ERROR]: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
}

// Rate limit: 10 requests per minute per IP
const RATE_LIMIT_CONFIG = { limit: 10, windowMs: 60000 }

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const clientId = getClientIdentifier(req)
    const rateLimit = checkRateLimit(clientId, RATE_LIMIT_CONFIG)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES[ERROR_CODES.RATE_LIMITED],
          code: ERROR_CODES.RATE_LIMITED,
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.limit),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      )
    }

    const { bidText, outputFormat = 'json' } = await req.json()

    if (!bidText || bidText.trim().length < 50) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES[ERROR_CODES.INVALID_INPUT],
          code: ERROR_CODES.INVALID_INPUT,
        },
        { status: 400 }
      )
    }

    const analysis = await analyzeBid(bidText)

    if (analysis.error) {
      // Internal error - return safe message to client
      return NextResponse.json(
        {
          error: ERROR_MESSAGES[ERROR_CODES.ANALYSIS_FAILED],
          code: ERROR_CODES.ANALYSIS_FAILED,
        },
        { status: 500 }
      )
    }

    // Add rate limit headers to successful responses
    const rateLimitHeaders = {
      'X-RateLimit-Limit': String(RATE_LIMIT_CONFIG.limit),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
    }

    if (outputFormat === 'json') {
      return NextResponse.json(
        {
          success: true,
          analysis,
          timestamp: new Date().toISOString(),
        },
        { headers: rateLimitHeaders }
      )
    }

    if (outputFormat === 'excel') {
      const excelBuffer = await createBidAnalysisExcel(analysis)
      const filename = `입찰분석_${analysis.사업개요?.사업명?.substring(0, 20) || 'UNIO'}_${Date.now()}.xlsx`

      return new NextResponse(excelBuffer as unknown as BodyInit, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
          ...rateLimitHeaders,
        },
      })
    }

    return NextResponse.json(
      {
        error: ERROR_MESSAGES[ERROR_CODES.INVALID_FORMAT],
        code: ERROR_CODES.INVALID_FORMAT,
      },
      { status: 400 }
    )
  } catch (_error) {
    // Internal error - return safe message to client
    return NextResponse.json(
      {
        error: ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
        code: ERROR_CODES.SERVER_ERROR,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/analyze-bid',
    methods: ['POST'],
    description: '입찰 공고 분석 API (Claude AI + Excel 자동화)',
    parameters: {
      bidText: '입찰 공고 텍스트 (필수, 최소 50자)',
      outputFormat: 'json | excel (기본: json)',
    },
    features: ['Claude Sonnet 4 API', '입찰 공고 자동 분석', 'UNIO 표준 6개 시트 엑셀 생성'],
    rateLimit: {
      limit: RATE_LIMIT_CONFIG.limit,
      windowMs: RATE_LIMIT_CONFIG.windowMs,
      description: `${RATE_LIMIT_CONFIG.limit} requests per ${RATE_LIMIT_CONFIG.windowMs / 1000} seconds`,
    },
  })
}

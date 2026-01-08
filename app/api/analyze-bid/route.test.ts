// app/api/analyze-bid/route.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST, GET } from './route'

// Mock the dependencies
vi.mock('@/lib/claude', () => ({
  analyzeBid: vi.fn(),
}))

vi.mock('@/lib/excel', () => ({
  createBidAnalysisExcel: vi.fn(),
}))

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(),
  getClientIdentifier: vi.fn(),
}))

// Import mocked modules
import { analyzeBid } from '@/lib/claude'
import { createBidAnalysisExcel } from '@/lib/excel'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit'

const mockedAnalyzeBid = vi.mocked(analyzeBid)
const mockedCreateBidAnalysisExcel = vi.mocked(createBidAnalysisExcel)
const mockedCheckRateLimit = vi.mocked(checkRateLimit)
const mockedGetClientIdentifier = vi.mocked(getClientIdentifier)

function createMockRequest(body: object, options: { headers?: Record<string, string> } = {}) {
  const url = 'http://localhost:3000/api/analyze-bid'
  const headers = new Headers({
    'content-type': 'application/json',
    ...options.headers,
  })

  return new NextRequest(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

describe('/api/analyze-bid', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementations
    mockedGetClientIdentifier.mockReturnValue('test-client-ip')
    mockedCheckRateLimit.mockReturnValue({
      success: true,
      remaining: 9,
      resetTime: Date.now() + 60000,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('POST', () => {
    it('returns 415 for invalid Content-Type', async () => {
      const req = new NextRequest('http://localhost:3000/api/analyze-bid', {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: 'test',
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(415)
      expect(data.code).toBe('INVALID_CONTENT_TYPE')
    })

    it('returns 400 for invalid JSON body', async () => {
      const req = new NextRequest('http://localhost:3000/api/analyze-bid', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: 'invalid json',
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.code).toBe('INVALID_JSON')
    })

    it('returns 400 for input shorter than 50 characters', async () => {
      const req = createMockRequest({ bidText: 'short input' })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.code).toBe('INVALID_INPUT')
    })

    it('returns 429 when rate limited', async () => {
      const resetTime = Date.now() + 30000
      mockedCheckRateLimit.mockReturnValue({
        success: false,
        remaining: 0,
        resetTime,
      })

      const req = createMockRequest({ bidText: 'a'.repeat(100) })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.code).toBe('RATE_LIMITED')
      expect(data.retryAfter).toBeGreaterThan(0)
      expect(response.headers.get('Retry-After')).toBeTruthy()
      expect(response.headers.get('X-RateLimit-Limit')).toBe('10')
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
    })

    it('returns JSON analysis for valid input', async () => {
      const mockAnalysis = {
        사업개요: { 사업명: '테스트 사업' },
        요구설비: [],
        평가기준: [],
        제출서류: [],
        UNIO추천: { 적합도: '상' },
      }
      mockedAnalyzeBid.mockResolvedValue(mockAnalysis)

      const req = createMockRequest({
        bidText: 'a'.repeat(100),
        outputFormat: 'json',
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.analysis).toEqual(mockAnalysis)
      expect(data.timestamp).toBeTruthy()
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('9')
    })

    it('returns Excel file when outputFormat is excel', async () => {
      const mockAnalysis = {
        사업개요: { 사업명: '테스트 사업' },
        요구설비: [],
        평가기준: [],
        제출서류: [],
        UNIO추천: { 적합도: '상' },
      }
      const mockBuffer = Buffer.from('mock excel data')

      mockedAnalyzeBid.mockResolvedValue(mockAnalysis)
      mockedCreateBidAnalysisExcel.mockResolvedValue(mockBuffer)

      const req = createMockRequest({
        bidText: 'a'.repeat(100),
        outputFormat: 'excel',
      })

      const response = await POST(req)

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      expect(response.headers.get('Content-Disposition')).toContain('attachment')
    })

    it('returns 400 for unsupported output format', async () => {
      const mockAnalysis = { 사업개요: {} }
      mockedAnalyzeBid.mockResolvedValue(mockAnalysis)

      const req = createMockRequest({
        bidText: 'a'.repeat(100),
        outputFormat: 'pdf',
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.code).toBe('INVALID_FORMAT')
    })

    it('returns 500 when analysis fails', async () => {
      mockedAnalyzeBid.mockResolvedValue({ error: 'Parse failed' })

      const req = createMockRequest({
        bidText: 'a'.repeat(100),
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.code).toBe('ANALYSIS_FAILED')
    })

    it('returns 500 for server errors', async () => {
      mockedAnalyzeBid.mockRejectedValue(new Error('Network error'))

      const req = createMockRequest({
        bidText: 'a'.repeat(100),
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.code).toBe('SERVER_ERROR')
    })
  })

  describe('GET', () => {
    it('returns API documentation', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('ok')
      expect(data.endpoint).toBe('/api/analyze-bid')
      expect(data.methods).toContain('POST')
      expect(data.parameters).toHaveProperty('bidText')
      expect(data.parameters).toHaveProperty('outputFormat')
      expect(data.rateLimit).toHaveProperty('limit')
      expect(data.rateLimit).toHaveProperty('windowMs')
    })
  })
})

import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock server-only before importing the module
vi.mock('server-only', () => ({}))

import { checkRateLimit, getClientIdentifier } from './rate-limit'

describe('rate-limit', () => {
  beforeEach(() => {
    // Clear rate limit store between tests
  })

  describe('checkRateLimit', () => {
    it('allows requests within limit', () => {
      const result = checkRateLimit('test-client-1', { limit: 10, windowMs: 60000 })
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(9)
    })

    it('blocks requests exceeding limit', () => {
      const identifier = 'test-client-2'
      const config = { limit: 2, windowMs: 60000 }

      checkRateLimit(identifier, config)
      checkRateLimit(identifier, config)
      const result = checkRateLimit(identifier, config)

      expect(result.success).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('returns correct rate limit info', () => {
      const result = checkRateLimit('test-client-3', { limit: 5, windowMs: 60000 })
      expect(result).toHaveProperty('success')
      expect(result).toHaveProperty('remaining')
      expect(result).toHaveProperty('resetTime')
    })
  })

  describe('getClientIdentifier', () => {
    it('extracts IP from x-forwarded-for header', () => {
      const mockRequest = {
        headers: new Headers({
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        }),
      } as Request

      const result = getClientIdentifier(mockRequest)
      expect(result).toBe('192.168.1.1')
    })

    it('extracts IP from x-real-ip header', () => {
      const mockRequest = {
        headers: new Headers({
          'x-real-ip': '172.16.0.1',
        }),
      } as Request

      const result = getClientIdentifier(mockRequest)
      expect(result).toBe('172.16.0.1')
    })

    it('returns default for missing headers', () => {
      const mockRequest = {
        headers: new Headers({}),
      } as Request

      const result = getClientIdentifier(mockRequest)
      expect(result).toBe('unknown-client')
    })
  })
})

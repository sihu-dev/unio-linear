// lib/index.ts - Barrel exports for lib utilities
export { analyzeBid, generateComplianceDoc, generateCustomerReport, analyzeMaintenanceSchedule } from './claude'
export { createBidAnalysisExcel, createFullUNIOTemplate, createWorkbook, createUNIOSheet, UNIO_SHEET_SCHEMAS, COLORS, STYLES } from './excel'
export { checkRateLimit, getClientIdentifier, type RateLimitConfig, type RateLimitResult } from './rate-limit'

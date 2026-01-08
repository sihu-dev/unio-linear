// types/index.ts
// UNIO 프로젝트 타입 정의

// ============================================
// 입찰 분석 관련 타입
// ============================================

export interface BidOverview {
  사업명: string
  발주처: string
  예산: string
  기간?: string
  사업기간?: string
  납품장소?: string
  입찰방식?: string
  공고번호?: string
  입찰마감?: string
  계약방식?: string
}

export interface Equipment {
  품명: string
  규격: string
  수량: string | number
  단위?: string
  비고?: string
}

export interface EvaluationCriteria {
  항목: string
  배점: string | number
  세부기준?: string
}

export interface RequiredDocument {
  서류명: string
  필수여부: '필수' | '선택' | string
  비고?: string
}

export interface UNIORecommendation {
  적합도?: string
  예상경쟁률?: string
  권장전략?: string
  예상소요비용?: string
}

export interface BidAnalysisResult {
  사업개요: BidOverview
  요구설비: Equipment[]
  핵심요구사항?: string[]
  평가기준: EvaluationCriteria[]
  제출서류: RequiredDocument[]
  주의사항?: string[]
  UNIO추천: UNIORecommendation
  적합도?: number
  error?: string
  raw?: string
}

// ============================================
// API 응답 타입
// ============================================

export interface ApiErrorResponse {
  error: string
  code: string
  details?: string
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// ============================================
// Claude API 관련 타입
// ============================================

export interface ClaudeAnalysisConfig {
  model?: string
  maxTokens?: number
  temperature?: number
}

export interface ComplianceDocData {
  company: string
  standard: string
  year: number
}

export interface CustomerReportData {
  company: string
  products: string[]
  period: string
}

export interface MaintenanceJob {
  id: string
  name: string
  type: string
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
}

export interface MaintenanceAsset {
  id: string
  name: string
  type: string
  status: 'active' | 'maintenance' | 'inactive'
  lastMaintenance?: string
}

export interface MaintenanceEvent {
  id: string
  assetId: string
  type: string
  date: string
  description?: string
}

// ============================================
// UI 컴포넌트 타입
// ============================================

export interface StatCardProps {
  title: string
  value: string
  change: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}

export interface EquipmentCardProps {
  name: string
  status: 'running' | 'idle' | 'maintenance' | 'error'
  efficiency: number
  runtime: string
}

export interface TabItem {
  id: string
  label: string
}

// ============================================
// Excel 관련 타입
// ============================================

export interface ExcelSheetSchema {
  name: string
  columns: ExcelColumnDef[]
}

export interface ExcelColumnDef {
  header: string
  key: string
  width?: number
}

export interface ExcelStyleConfig {
  headerBgColor: string
  headerFontColor: string
  alternateBgColor?: string
  borderColor?: string
}

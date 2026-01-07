// lib/excel.ts
// UNIO 엑셀 생성 유틸리티 - 6개 시트 표준 포맷

import ExcelJS from "exceljs";

// UNIO 표준 색상
const COLORS = {
  NAVY: "1a2332",
  TEAL: "2d8b8b",
  SEAFOAM: "a8dadc",
  CREAM: "f1faee",
  RED: "e63946",
  SUCCESS: "2a9d8f",
  WARNING: "f4a261",
  WHITE: "FFFFFF",
  GRAY: "718096",
};

// 스타일 프리셋
const STYLES = {
  header: {
    font: { bold: true, color: { argb: "FF" + COLORS.WHITE }, size: 11 },
    fill: {
      type: "pattern" as const,
      pattern: "solid" as const,
      fgColor: { argb: "FF" + COLORS.NAVY },
    },
    alignment: { horizontal: "center" as const, vertical: "middle" as const },
    border: {
      top: { style: "thin" as const },
      left: { style: "thin" as const },
      bottom: { style: "thin" as const },
      right: { style: "thin" as const },
    },
  },
  cell: {
    font: { size: 10 },
    alignment: { vertical: "middle" as const, wrapText: true },
    border: {
      top: { style: "thin" as const, color: { argb: "FFE0E0E0" } },
      left: { style: "thin" as const, color: { argb: "FFE0E0E0" } },
      bottom: { style: "thin" as const, color: { argb: "FFE0E0E0" } },
      right: { style: "thin" as const, color: { argb: "FFE0E0E0" } },
    },
  },
  highlight: {
    fill: {
      type: "pattern" as const,
      pattern: "solid" as const,
      fgColor: { argb: "FF" + COLORS.CREAM },
    },
  },
  important: {
    font: { bold: true, color: { argb: "FF" + COLORS.RED } },
  },
  success: {
    font: { bold: true, color: { argb: "FF" + COLORS.SUCCESS } },
  },
};

// UNIO 6개 시트 구조 정의
export const UNIO_SHEET_SCHEMAS = {
  Jobs: {
    name: "Jobs",
    description: "작업/프로젝트 관리",
    columns: [
      { key: "JobID", header: "Job ID", width: 12 },
      { key: "ProjectName", header: "프로젝트명", width: 25 },
      { key: "ClientID", header: "고객 ID", width: 10 },
      { key: "ClientName", header: "고객사", width: 20 },
      { key: "SiteLocation", header: "현장 위치", width: 20 },
      { key: "JobType", header: "작업 유형", width: 12 },
      { key: "Status", header: "상태", width: 10 },
      { key: "Priority", header: "우선순위", width: 10 },
      { key: "AssignedTo", header: "담당자", width: 12 },
      { key: "RequestDate", header: "요청일", width: 12 },
      { key: "StartDate", header: "시작일", width: 12 },
      { key: "DueDate", header: "마감일", width: 12 },
      { key: "CompletedDate", header: "완료일", width: 12 },
      { key: "EstimatedHours", header: "예상시간", width: 10 },
      { key: "ActualHours", header: "실제시간", width: 10 },
      { key: "BudgetKRW", header: "예산(원)", width: 15 },
      { key: "ActualCostKRW", header: "실비용(원)", width: 15 },
      { key: "Notes", header: "비고", width: 30 },
    ],
  },
  Assets: {
    name: "Assets",
    description: "로봇셀/설비 이력",
    columns: [
      { key: "AssetID", header: "Asset ID", width: 12 },
      { key: "AssetName", header: "설비명", width: 20 },
      { key: "AssetType", header: "설비 유형", width: 15 },
      { key: "Manufacturer", header: "제조사", width: 15 },
      { key: "Model", header: "모델명", width: 15 },
      { key: "SerialNumber", header: "시리얼번호", width: 18 },
      { key: "InstallDate", header: "설치일", width: 12 },
      { key: "Location", header: "위치", width: 20 },
      { key: "Status", header: "상태", width: 10 },
      { key: "LastMaintenance", header: "최근 정비", width: 12 },
      { key: "NextMaintenance", header: "다음 정비", width: 12 },
      { key: "OTTChipID", header: "OTT칩 ID", width: 12 },
      { key: "FirmwareVersion", header: "펌웨어", width: 12 },
      { key: "WarrantyExpiry", header: "보증만료", width: 12 },
      { key: "PurchaseCostKRW", header: "구매가(원)", width: 15 },
      { key: "CurrentValueKRW", header: "현재가(원)", width: 15 },
      { key: "Notes", header: "비고", width: 30 },
    ],
  },
  Events: {
    name: "Events",
    description: "이벤트/로그 기록",
    columns: [
      { key: "EventID", header: "Event ID", width: 12 },
      { key: "AssetID", header: "Asset ID", width: 12 },
      { key: "JobID", header: "Job ID", width: 12 },
      { key: "Timestamp", header: "발생시각", width: 18 },
      { key: "EventType", header: "이벤트 유형", width: 15 },
      { key: "Severity", header: "심각도", width: 10 },
      { key: "Description", header: "설명", width: 35 },
      { key: "DetectedBy", header: "감지자", width: 12 },
      { key: "ResolvedBy", header: "해결자", width: 12 },
      { key: "ResolutionTime", header: "해결시간", width: 12 },
      { key: "RootCause", header: "근본원인", width: 25 },
      { key: "PreventiveAction", header: "예방조치", width: 25 },
      { key: "DataSnapshot", header: "데이터스냅샷", width: 20 },
      { key: "AIConfidence", header: "AI신뢰도", width: 10 },
      { key: "Notes", header: "비고", width: 25 },
    ],
  },
  Evidence: {
    name: "Evidence",
    description: "증빙자료 관리",
    columns: [
      { key: "EvidenceID", header: "Evidence ID", width: 12 },
      { key: "JobID", header: "Job ID", width: 12 },
      { key: "AssetID", header: "Asset ID", width: 12 },
      { key: "EventID", header: "Event ID", width: 12 },
      { key: "EvidenceType", header: "증빙 유형", width: 15 },
      { key: "FileName", header: "파일명", width: 25 },
      { key: "FileURL", header: "파일 URL", width: 40 },
      { key: "UploadDate", header: "업로드일", width: 12 },
      { key: "UploadedBy", header: "업로더", width: 12 },
      { key: "FileSize", header: "파일크기", width: 12 },
      { key: "Checksum", header: "체크섬", width: 20 },
      { key: "Notes", header: "비고", width: 25 },
    ],
  },
  Compliance: {
    name: "Compliance",
    description: "정부 증빙",
    columns: [
      { key: "ComplianceID", header: "Compliance ID", width: 14 },
      { key: "JobID", header: "Job ID", width: 12 },
      { key: "RequirementType", header: "요구사항 유형", width: 18 },
      { key: "DueDate", header: "제출기한", width: 12 },
      { key: "Status", header: "상태", width: 10 },
      { key: "SubmittedDate", header: "제출일", width: 12 },
      { key: "ApprovalDate", header: "승인일", width: 12 },
      { key: "DocumentURL", header: "문서 URL", width: 40 },
      { key: "ReviewedBy", header: "검토자", width: 12 },
      { key: "Notes", header: "비고", width: 30 },
    ],
  },
  CustomerOps: {
    name: "CustomerOps",
    description: "고객 리포트",
    columns: [
      { key: "ReportID", header: "Report ID", width: 12 },
      { key: "ClientID", header: "고객 ID", width: 10 },
      { key: "ReportType", header: "리포트 유형", width: 15 },
      { key: "PeriodStart", header: "기간 시작", width: 12 },
      { key: "PeriodEnd", header: "기간 종료", width: 12 },
      { key: "GeneratedDate", header: "생성일", width: 12 },
      { key: "DeliveryMethod", header: "전달방식", width: 12 },
      { key: "Notes", header: "비고", width: 35 },
    ],
  },
};

// 워크북 생성 헬퍼
export function createWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "UNIO Platform";
  workbook.created = new Date();
  workbook.modified = new Date();
  return workbook;
}

// 시트에 헤더 스타일 적용
function applyHeaderStyle(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.font = STYLES.header.font;
    cell.fill = STYLES.header.fill;
    cell.alignment = STYLES.header.alignment;
    cell.border = STYLES.header.border;
  });
  row.height = 25;
}

// 시트에 데이터 스타일 적용
function applyDataStyle(row: ExcelJS.Row, isAlternate: boolean = false) {
  row.eachCell((cell) => {
    cell.font = STYLES.cell.font;
    cell.alignment = STYLES.cell.alignment;
    cell.border = STYLES.cell.border;
    if (isAlternate) {
      cell.fill = STYLES.highlight.fill;
    }
  });
}

// UNIO 표준 시트 생성
export function createUNIOSheet(
  workbook: ExcelJS.Workbook,
  sheetType: keyof typeof UNIO_SHEET_SCHEMAS,
  data: Record<string, any>[] = []
) {
  const schema = UNIO_SHEET_SCHEMAS[sheetType];
  const sheet = workbook.addWorksheet(schema.name);

  sheet.columns = schema.columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width,
  }));

  applyHeaderStyle(sheet.getRow(1));

  data.forEach((row, index) => {
    const excelRow = sheet.addRow(row);
    applyDataStyle(excelRow, index % 2 === 1);
  });

  if (data.length > 0) {
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: schema.columns.length },
    };
  }

  return sheet;
}

// 입찰 분석 엑셀 생성
export async function createBidAnalysisExcel(analysis: any): Promise<Buffer> {
  const workbook = createWorkbook();

  // Sheet 1: 사업개요
  const sheet1 = workbook.addWorksheet("사업개요");
  sheet1.columns = [
    { header: "항목", key: "item", width: 20 },
    { header: "내용", key: "content", width: 50 },
  ];
  applyHeaderStyle(sheet1.getRow(1));

  const overview = analysis.사업개요 || {};
  const overviewData = [
    { item: "사업명", content: overview.사업명 || "-" },
    { item: "발주처", content: overview.발주처 || "-" },
    { item: "공고번호", content: overview.공고번호 || "-" },
    { item: "예산", content: overview.예산 || "-" },
    { item: "사업기간", content: overview.사업기간 || "-" },
    { item: "납품장소", content: overview.납품장소 || "-" },
    { item: "입찰마감", content: overview.입찰마감 || "-" },
    { item: "계약방식", content: overview.계약방식 || "-" },
  ];
  overviewData.forEach((row, i) => {
    const excelRow = sheet1.addRow(row);
    applyDataStyle(excelRow, i % 2 === 1);
  });

  // Sheet 2: 요구설비
  const sheet2 = workbook.addWorksheet("요구설비");
  sheet2.columns = [
    { header: "#", key: "no", width: 5 },
    { header: "품명", key: "name", width: 25 },
    { header: "규격", key: "spec", width: 30 },
    { header: "수량", key: "qty", width: 10 },
    { header: "단위", key: "unit", width: 10 },
    { header: "비고", key: "note", width: 25 },
  ];
  applyHeaderStyle(sheet2.getRow(1));

  const equipment = analysis.요구설비 || [];
  equipment.forEach((item: any, i: number) => {
    const excelRow = sheet2.addRow({
      no: i + 1,
      name: item.품명 || "-",
      spec: item.규격 || "-",
      qty: item.수량 || "-",
      unit: item.단위 || "-",
      note: item.비고 || "-",
    });
    applyDataStyle(excelRow, i % 2 === 1);
  });

  // Sheet 3: 평가기준
  const sheet3 = workbook.addWorksheet("평가기준");
  sheet3.columns = [
    { header: "평가항목", key: "item", width: 25 },
    { header: "배점", key: "score", width: 10 },
    { header: "세부기준", key: "detail", width: 50 },
  ];
  applyHeaderStyle(sheet3.getRow(1));

  const criteria = analysis.평가기준 || [];
  criteria.forEach((item: any, i: number) => {
    const excelRow = sheet3.addRow({
      item: item.항목 || "-",
      score: item.배점 || "-",
      detail: item.세부기준 || "-",
    });
    applyDataStyle(excelRow, i % 2 === 1);
  });

  // Sheet 4: 제출서류
  const sheet4 = workbook.addWorksheet("제출서류");
  sheet4.columns = [
    { header: "#", key: "no", width: 5 },
    { header: "서류명", key: "name", width: 35 },
    { header: "필수여부", key: "required", width: 12 },
    { header: "준비상태", key: "status", width: 12 },
    { header: "비고", key: "note", width: 30 },
  ];
  applyHeaderStyle(sheet4.getRow(1));

  const documents = analysis.제출서류 || [];
  documents.forEach((item: any, i: number) => {
    const excelRow = sheet4.addRow({
      no: i + 1,
      name: item.서류명 || "-",
      required: item.필수여부 || "-",
      status: "미준비",
      note: item.비고 || "-",
    });
    applyDataStyle(excelRow, i % 2 === 1);

    if (item.필수여부 === "필수") {
      excelRow.getCell("required").font = STYLES.important.font;
    }
  });

  // Sheet 5: UNIO 분석
  const sheet5 = workbook.addWorksheet("UNIO분석");
  sheet5.columns = [
    { header: "분석항목", key: "item", width: 20 },
    { header: "분석결과", key: "result", width: 50 },
  ];
  applyHeaderStyle(sheet5.getRow(1));

  const unioAnalysis = analysis.UNIO추천 || {};
  const analysisData = [
    { item: "적합도", result: unioAnalysis.적합도 || "-" },
    { item: "예상경쟁률", result: unioAnalysis.예상경쟁률 || "-" },
    { item: "권장전략", result: unioAnalysis.권장전략 || "-" },
    { item: "예상소요비용", result: unioAnalysis.예상소요비용 || "-" },
  ];
  analysisData.forEach((row, i) => {
    const excelRow = sheet5.addRow(row);
    applyDataStyle(excelRow, i % 2 === 1);

    if (row.item === "적합도") {
      const cell = excelRow.getCell("result");
      if (row.result === "상") {
        cell.font = STYLES.success.font;
      } else if (row.result === "하") {
        cell.font = STYLES.important.font;
      }
    }
  });

  // Sheet 6: 견적서 템플릿
  const sheet6 = workbook.addWorksheet("견적서");
  sheet6.columns = [
    { header: "#", key: "no", width: 5 },
    { header: "품명", key: "name", width: 25 },
    { header: "규격", key: "spec", width: 25 },
    { header: "수량", key: "qty", width: 8 },
    { header: "단가(원)", key: "price", width: 15 },
    { header: "금액(원)", key: "amount", width: 15 },
    { header: "비고", key: "note", width: 20 },
  ];
  applyHeaderStyle(sheet6.getRow(1));

  equipment.forEach((item: any, i: number) => {
    const excelRow = sheet6.addRow({
      no: i + 1,
      name: item.품명 || "-",
      spec: item.규격 || "-",
      qty: item.수량 || 1,
      price: 0,
      amount: { formula: `D${i + 2}*E${i + 2}` },
      note: "",
    });
    applyDataStyle(excelRow, i % 2 === 1);
  });

  const totalRow = sheet6.addRow({
    no: "",
    name: "",
    spec: "",
    qty: "합계",
    price: "",
    amount: { formula: `SUM(F2:F${equipment.length + 1})` },
    note: "",
  });
  totalRow.font = { bold: true };
  totalRow.getCell("amount").numFmt = "#,##0";

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

// 전체 UNIO 템플릿 엑셀 생성
export async function createFullUNIOTemplate(): Promise<Buffer> {
  const workbook = createWorkbook();

  Object.keys(UNIO_SHEET_SCHEMAS).forEach((sheetType) => {
    createUNIOSheet(workbook, sheetType as keyof typeof UNIO_SHEET_SCHEMAS, []);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

export { COLORS, STYLES };
